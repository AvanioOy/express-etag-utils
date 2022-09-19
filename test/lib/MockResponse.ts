/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable n/handle-callback-err */
/* eslint-disable sonarjs/no-duplicate-string */
import {ParamsDictionary, Application, Response, CookieOptions, Errback, Request, Send} from 'express-serve-static-core';
import {OutgoingHttpHeader, OutgoingHttpHeaders} from 'http';
import {Socket} from 'net';
import {ParsedQs} from 'qs';
import {Readable} from 'stream';

export class MockResponse implements Response {
	private currentStatus = 200;
	private bodyData: any;
	private headerList: Record<string, string | number | string[]> = {};
	status(code: number): this {
		this.currentStatus = code;
		return this;
	}

	public getCurrentStatus(): number {
		return this.currentStatus;
	}

	sendStatus(code: number): this {
		this.currentStatus = code;
		return this;
	}

	links(links: any): this {
		throw new Error('Method not implemented.');
	}

	send(): this {
		return this;
	}

	json(data: any): this {
		this.bodyData = data;
		return this;
	}

	public getBodyData(): any {
		return this.bodyData;
	}

	jsonp: Send<any, this>;
	sendFile(path: string, fn?: Errback | undefined): void;
	sendFile(path: string, options: any, fn?: Errback | undefined): void;
	sendFile(path: unknown, options?: unknown, fn?: unknown): void {
		throw new Error('Method not implemented.');
	}

	sendfile(path: string): void;
	sendfile(path: string, options: any): void;
	sendfile(path: string, fn: Errback): void;
	sendfile(path: string, options: any, fn: Errback): void;
	sendfile(path: unknown, options?: unknown, fn?: unknown): void {
		throw new Error('Method not implemented.');
	}

	download(path: string, fn?: Errback | undefined): void;
	download(path: string, filename: string, fn?: Errback | undefined): void;
	download(path: string, filename: string, options: any, fn?: Errback | undefined): void;
	download(path: unknown, filename?: unknown, options?: unknown, fn?: unknown): void {
		throw new Error('Method not implemented.');
	}

	contentType(type: string): this {
		throw new Error('Method not implemented.');
	}

	type(type: string): this {
		throw new Error('Method not implemented.');
	}

	format(obj: any): this {
		throw new Error('Method not implemented.');
	}

	attachment(filename?: string | undefined): this {
		throw new Error('Method not implemented.');
	}

	set(field: any): this;
	set(field: string, value?: string | string[] | undefined): this;
	set(field: unknown, value?: unknown): this {
		throw new Error('Method not implemented.');
	}

	header(field: any): this;
	header(field: string, value?: string | string[] | undefined): this;
	header(field: unknown, value?: unknown): this {
		throw new Error('Method not implemented.');
	}

	headersSent: boolean;
	get(field: string): string | undefined {
		throw new Error('Method not implemented.');
	}

	clearCookie(name: string, options?: CookieOptions | undefined): this {
		throw new Error('Method not implemented.');
	}

	cookie(name: string, val: string, options: CookieOptions): this;
	cookie(name: string, val: any, options: CookieOptions): this;
	cookie(name: string, val: any): this;
	cookie(name: unknown, val: unknown, options?: unknown): this {
		throw new Error('Method not implemented.');
	}

	location(url: string): this {
		throw new Error('Method not implemented.');
	}

	redirect(url: string): void;
	redirect(status: number, url: string): void;
	redirect(url: string, status: number): void;
	redirect(url: unknown, status?: unknown): void {
		throw new Error('Method not implemented.');
	}

	render(
		view: string,
		options?: object | undefined,
		callback?: ((err: Error, html: string) => /* eslint-disable sonarjs/no-duplicate-string */ void) | undefined,
	): void;

	render(view: string, callback?: ((err: Error, html: /* eslint-disable n/handle-callback-err */ string) => void) | undefined): void;
	render(view: unknown, options?: unknown, callback?: unknown): void {
		throw new Error('Method not implemented.');
	}

	locals: Record<string, any>;
	charset: string;
	vary(field: string): this {
		throw new Error('Method not implemented.');
	}

	app: Application<Record<string, any>>;
	append(field: string, value?: string | string[] | undefined): this {
		throw new Error('Method not implemented.');
	}

	req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>;
	statusCode: number;
	statusMessage: string;
	assignSocket(socket: Socket): void {
		throw new Error('Method not implemented.');
	}

	detachSocket(socket: Socket): void {
		throw new Error('Method not implemented.');
	}

	writeContinue(callback?: (() => void) | undefined): void {
		throw new Error('Method not implemented.');
	}

	writeHead(statusCode: number, statusMessage?: string | undefined, headers?: OutgoingHttpHeaders | OutgoingHttpHeader[] | undefined): this;
	writeHead(statusCode: number, headers?: OutgoingHttpHeaders | OutgoingHttpHeader[] | undefined): this;
	writeHead(statusCode: unknown, statusMessage?: unknown, headers?: unknown): this {
		throw new Error('Method not implemented.');
	}

	writeProcessing(): void {
		throw new Error('Method not implemented.');
	}

	chunkedEncoding: boolean;
	shouldKeepAlive: boolean;
	useChunkedEncodingByDefault: boolean;
	sendDate: boolean;
	finished: boolean;
	connection: Socket | null;
	socket: Socket | null;
	setTimeout(msecs: number, callback?: (() => void) | undefined): this {
		throw new Error('Method not implemented.');
	}

	setHeader(name: string, value: string | number | readonly string[]): this {
		this.headerList[name] = value as any;
		return this;
	}

	getHeader(name: string): string | number | string[] | undefined {
		return this.headerList[name];
	}

	getHeaders(): OutgoingHttpHeaders {
		throw new Error('Method not implemented.');
	}

	getHeaderNames(): string[] {
		throw new Error('Method not implemented.');
	}

	hasHeader(name: string): boolean {
		throw new Error('Method not implemented.');
	}

	removeHeader(name: string): void {
		throw new Error('Method not implemented.');
	}

	addTrailers(headers: OutgoingHttpHeaders | readonly [string, string][]): void {
		throw new Error('Method not implemented.');
	}

	flushHeaders(): void {
		throw new Error('Method not implemented.');
	}

	writable: boolean;
	writableEnded: boolean;
	writableFinished: boolean;
	writableHighWaterMark: number;
	writableLength: number;
	writableObjectMode: boolean;
	writableCorked: number;
	destroyed: boolean;
	closed: boolean;
	errored: Error | null;
	writableNeedDrain: boolean;
	_write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null | undefined) => /* eslint-disable sonarjs/no-duplicate-string */ void): void {
		throw new Error('Method not implemented.');
	}

	_destroy(error: Error | null, callback: (error?: Error | null | undefined) => void): void {
		throw new Error('Method not implemented.');
	}

	_final(
		callback: (
			error?: Error | null | undefined /* eslint-disable n/handle-callback-err */,
			/* eslint-disable sonarjs/no-duplicate-string */
		) => void,
	): void {
		throw new Error('Method not implemented.');
	}

	write(
		chunk: any,
		callback?:
			| ((
					error:
						| Error
						| null /* eslint-disable n/handle-callback-err */
						/* eslint-disable sonarjs/no-duplicate-string */
						| undefined,
			  ) => void)
			| undefined,
	): boolean;

	write(
		chunk: any,
		encoding: BufferEncoding,
		callback?: ((error: Error | null | undefined) => /* eslint-disable sonarjs/no-duplicate-string */ void) | undefined,
	): boolean;

	write(chunk: unknown, encoding?: unknown, callback?: unknown): boolean {
		throw new Error('Method not implemented.');
	}

	setDefaultEncoding(encoding: BufferEncoding): this {
		throw new Error('Method not implemented.');
	}

	end(cb?: (() => void) | undefined): this;
	end(chunk: any, cb?: (() => void) | undefined): this;
	end(chunk: any, encoding: BufferEncoding, cb?: (() => void) | undefined): this;
	end(chunk?: unknown, encoding?: unknown, cb?: unknown): this {
		return this;
	}

	cork(): void {
		throw new Error('Method not implemented.');
	}

	uncork(): void {
		throw new Error('Method not implemented.');
	}

	destroy(error?: Error | undefined): this {
		throw new Error('Method not implemented.');
	}

	addListener(event: 'close', listener: () => void): this;
	addListener(event: 'drain', listener: () => void): this;
	addListener(
		event: 'error',
		listener: (
			err: Error,
			/* eslint-disable n/handle-callback-err */
			/* eslint-disable sonarjs/no-duplicate-string */
		) => void,
	): this;

	addListener(event: 'finish', listener: () => void): this;
	addListener(event: 'pipe', listener: (src: Readable) => void): this;
	addListener(event: 'unpipe', listener: (src: Readable) => void): this;
	addListener(
		event: string | symbol,
		listener: (
			.../* eslint-disable n/handle-callback-err */
			/* eslint-disable sonarjs/no-duplicate-string */
			args: any[]
		) => void,
	): this;

	addListener(event: unknown, listener: unknown): this {
		throw new Error('Method not implemented.');
	}

	emit(event: 'close'): boolean;
	emit(event: 'drain'): boolean;
	emit(event: 'error', err: Error): boolean;
	emit(event: 'finish'): boolean;
	emit(event: 'pipe', src: Readable): boolean;
	emit(event: 'unpipe', src: Readable): boolean;
	emit(event: string | symbol, ...args: any[]): boolean;
	emit(event: unknown, src?: unknown, ...rest: unknown[]): boolean {
		throw new Error('Method not implemented.');
	}

	on(event: 'close', listener: () => void): this;
	on(event: 'drain', listener: () => void): this;
	on(event: 'error', listener: (err: Error) => void): this;
	on(event: 'finish', listener: () => void): this;
	on(event: 'pipe', listener: (src: Readable) => void): this;
	on(event: 'unpipe', listener: (src: Readable) => void): this;
	on(event: string | symbol, listener: (...args: any /* eslint-disable n/handle-callback-err */[]) => void): this;
	on(event: unknown, listener: unknown): this {
		throw new Error('Method not implemented.');
	}

	once(event: 'close', listener: () => void): this;
	once(event: 'drain', listener: () => void): this;
	once(event: 'error', listener: (err: Error) => void): this;
	once(event: 'finish', listener: () => void): this;
	once(event: 'pipe', listener: (src: Readable) => void): this;
	once(event: 'unpipe', listener: (src: Readable) => /* eslint-disable sonarjs/no-duplicate-string */ void): this;

	once(event: string | symbol, listener: (...args: any[]) => void): this;
	once(event: unknown, listener: unknown): this {
		throw new Error('Method not implemented.');
	}

	prependListener(event: 'close', listener: () => void): this;
	prependListener(event: 'drain', listener: () => void): this;
	prependListener(event: 'error', listener: (err: Error) => void): this;
	prependListener(event: 'finish', listener: () => void): this;
	prependListener(event: 'pipe', listener: (src: Readable) => void): this;
	prependListener(event: 'unpipe', listener: (src: Readable) => void): this;
	prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
	prependListener(event: unknown, listener: unknown): this {
		throw new Error('Method not implemented.');
	}

	prependOnceListener(event: 'close', listener: () => void): this;
	prependOnceListener(event: 'drain', listener: () => void): this;
	prependOnceListener(event: 'error', listener: (err: /* eslint-disable n/handle-callback-err */ Error) => void): this;
	prependOnceListener(event: 'finish', listener: () => void): this;
	prependOnceListener(event: 'pipe', listener: (src: /* eslint-disable sonarjs/no-duplicate-string */ Readable) => void): this;

	prependOnceListener(event: 'unpipe', listener: (src: Readable) => void): this;
	prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
	prependOnceListener(event: unknown, listener: unknown): this {
		throw new Error('Method not implemented.');
	}

	removeListener(event: 'close', listener: () => void): this;
	removeListener(event: 'drain', listener: () => void): this;
	removeListener(event: 'error', listener: (err: Error) => void): this;
	removeListener(event: 'finish', listener: () => void): this;
	removeListener(event: 'pipe', listener: (src: Readable) => void): this;
	removeListener(event: 'unpipe', listener: (src: Readable) => void): this;
	removeListener(
		event: string | symbol,
		listener: (
			/* eslint-disable n/handle-callback-err */
			/* eslint-disable sonarjs/no-duplicate-string */
			...args: any[]
		) => void,
	): this;

	removeListener(event: unknown, listener: unknown): this {
		throw new Error('Method not implemented.');
	}

	pipe<T extends NodeJS.WritableStream>(destination: T, options?: {end?: boolean | undefined} | undefined): T {
		throw new Error('Method not implemented.');
	}

	off(eventName: string | symbol, listener: (...args: /* eslint-disable n/handle-callback-err */ any[]) => void): this {
		throw new Error('Method not implemented.');
	}

	removeAllListeners(event?: string | symbol | undefined): this {
		throw new Error('Method not implemented.');
	}

	setMaxListeners(n: number): this {
		throw new Error('Method not implemented.');
	}

	getMaxListeners(): number {
		throw new Error('Method not implemented.');
	}

	listeners(eventName: string | symbol): Function[] {
		throw new Error('Method not implemented.');
	}

	rawListeners(eventName: string | symbol): Function[] {
		throw new Error('Method not implemented.');
	}

	listenerCount(eventName: string | symbol): number {
		throw new Error('Method not implemented.');
	}

	eventNames(): (string | symbol)[] {
		throw new Error('Method not implemented.');
	}
}
