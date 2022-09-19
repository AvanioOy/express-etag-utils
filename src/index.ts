import * as etag from 'etag';
import {Request, RequestHandler, Response} from 'express';
import {ETagError} from './ETagError';
export {ETagError, isETagError} from './ETagError';

export function etagBuilder(data: unknown, options?: etag.Options): string | undefined {
	let etagData = null;
	if (data === null || data === undefined) {
		return undefined;
	}
	if (data instanceof Buffer) {
		return etag(data, options);
	}
	switch (typeof data) {
		case 'bigint':
		case 'number':
			etagData = etag('' + data, options);
			break;
		case 'boolean':
			etagData = etag(data ? 'true' : 'false', options);
			break;
		case 'string':
			etagData = etag(data, options);
			break;
		case 'object':
			etagData = etag(JSON.stringify(data), options);
			break;
	}
	if (etagData) {
		return etagData;
	}
	return undefined;
}

/**
 * Check if the request 'if-none-match' header has a matching etag with the given etag
 * @param req Express Request
 * @param etagHash data ETag hash
 * @param {boolean} throwsError if header is missing
 * @returns {boolean} if none match
 */
export function ifNoneMatch(req: Request, etagHash: string, throwsError?: boolean): boolean {
	if ('if-none-match' in req.headers) {
		return isValueMatch(req.headers['if-none-match'], etagHash);
	}
	if (throwsError) {
		throw new ETagError('if-none-match is not set');
	}
	return false;
}

export function isValueMatch(input: string[] | string | undefined, value: string | undefined): boolean {
	if (input === undefined || value === undefined) {
		return false;
	}
	if (Array.isArray(input)) {
		let found = false;
		input.forEach((i) => {
			if (i === value) {
				found = true;
			}
		});
		return found;
	} else {
		return value === input;
	}
}

/**
 * Check if the request 'if-match' header has a matching etag with the given etag.
 * @param req Express Request
 * @param etagHash data ETag hash
 * @param {boolean | 'error'} [isNotSet=true] for missing header, true = ignore, false = 409 Conflict, 'error' = throws ETagError. (default: true).
 * @returns {boolean} if match
 */
export function ifMatch(req: Request, etagHash: string | undefined, isNotSet: boolean | 'error' = true): boolean {
	if ('if-match' in req.headers) {
		return isValueMatch(req.headers['if-match'], etagHash);
	}
	if (isNotSet === 'error') {
		throw new ETagError('if-match is not set');
	}
	return isNotSet;
}

/**
 * Compares current body object etag and check against if-match header
 * @param body data object
 * @param req Express Request
 * @param {boolean | 'error'} [isNotSet=true] for missing header, true = ignore, false = 409 Conflict, 'error' = throws ETagError. (default: true).
 * @return {boolean}
 */
export function ifMatchCheck(body: unknown, req: Request, isNotSet: boolean | 'error' = true): boolean {
	return ifMatch(req, etagBuilder(body), isNotSet);
}

export function jsonEtagResponse(data: unknown, res: Response) {
	const etagHash = etagBuilder(data);
	if (etagHash) {
		res.setHeader('ETag', etagHash);
	}
	res.json(data);
	res.end();
}

/**
 * JSON ETag match response check from object payload.
 *
 * Response will be 304 without payload if ETag checksum matches with 'if-none-match' header
 * @param {boolean} throwsError if header is missing
 * @example
 * jsonIfNoneMatch(mongoModel.toObject(), req, res);
 */
export function jsonIfNoneMatch(data: unknown, req: Request, res: Response, throwsError?: boolean) {
	const etagHash = etagBuilder(data);
	if (etagHash && ifNoneMatch(req, etagHash, throwsError) === true) {
		res.status(304).send('Not Modified');
		return;
	}
	if (etagHash) {
		res.setHeader('ETag', etagHash);
	}
	res.json(data).end();
}

/**
 * Handle checking ETag match from object payload.
 */
export function ifMatchFunction(data: unknown, req: Request, res: Response, error?: Error | undefined, isNotSet = true): void {
	if (ifMatchCheck(data, req, isNotSet) === false) {
		if (error) {
			throw error;
		}
		res.status(409).send('Conflict');
	}
}

export type IfNoneMatchHandlerCallback<T = unknown> = (req: Request, res: Response) => Promise<T>;

/**
 * Express middleware to handle ETag match from callbacks object payload and response with 304 if match.
 * @param payloadType payload type for senging response
 * @param payloadCallback callback to get payload
 * @param throwsError will throw error if header is missing
 * @returns Express RequestHandler
 * @example
 * app.put('/api/endpoint', ifNoneMatchHandler('json', async (req, res) => {
 *   return (await Model.find()).map((m) => m.toObject());
 * }));
 */
export function ifNoneMatchHandler<T = unknown>(payloadType: 'json', payloadCallback: IfNoneMatchHandlerCallback<T>, throwsError?: boolean): RequestHandler {
	return async (req, res, next) => {
		try {
			if (payloadType === 'json') {
				jsonIfNoneMatch(await payloadCallback(req, res), req, res, throwsError);
				return;
			}
			throw new Error('Invalid payload type');
		} catch (e) {
			next(e);
		}
	};
}

export type IfMatchHandlerCallback<T = unknown> = (req: Request, res: Response) => Promise<T>;
/**
 * Express middleware to handle ETag match from callbacks object payload and if ETag matches then will continue to next middleware.
 * @param payloadCallback callback function to get ETag payload
 * @param {Error | undefined} error optional error to throw if ETag does not match (default: 409 Conflict response)
 * @param {boolean} [isNotSet=true] set this false if header is always required (default: true)
 * @example
 * const payloadCallback: IfMatchHandlerCallback = async (req, res) => {
 *   res.locals.model = await Model.findOne({id: req.params.id});
 *   if (!res.locals.model ) {
 *    throw new HttpError(404, 'Not Found');
 *   }
 *   return res.locals.model.toObject();
 * };
 * app.put('/api/endpoint/:id', ifMatchHandler(payloadCallback), async (req, res, next) => {
 *   if (!res.locals.model) {
 *     throw new HttpError(404, 'Not Found');
 *   }
 *   Object.assign(res.locals.model, req.body);
 *   if(res.locals.model.isModified()) {
 *     await res.locals.model.save();
 *   }
 *   res.status(200).send('Ok');
 * });
 */
export function ifMatchHandler<T = unknown>(payloadCallback: IfMatchHandlerCallback<T>, error?: Error | undefined, isNotSet = true): RequestHandler {
	return async (req, res, next) => {
		try {
			ifMatchFunction(await payloadCallback(req, res), req, res, error, isNotSet);
		} catch (e) {
			next(e);
		}
	};
}
