# express-etag-utils

ExpressJS ETag utils

## ifNoneMatchHandler: middleware check if current payload is identical with 'if-none-match' header, return 304 (else payload as json with ETag header)

```typescript
const payloadCallback: IfNoneMatchHandlerCallback = async (req, res) => {
	return (await Model.find()).map((m) => m.toObject());
};

app.get('/api/endpoint', ifNoneMatchHandler('json', payloadCallback));
```

## ifMatchHandler: middleware to block if payloadCallback data is already changed based on 'if-match' header

```typescript
const payloadCallback: IfMatchHandlerCallback = async (req, res) => {
	res.locals.model = await Model.findOne({id: req.params.id});
	if (!res.locals.model) {
		throw new HttpError(404, 'Not Found');
	}
	return res.locals.model.toObject();
};

app.put('/api/endpoint/:id', ifMatchHandler(payloadCallback), async (req, res, next) => {
	if (!res.locals.model) {
		throw new HttpError(404, 'Not Found');
	}
	Object.assign(res.locals.model, req.body);
	if (res.locals.model.isModified()) {
		await res.locals.model.save();
	}
	res.status(200).send('Ok');
});
```
