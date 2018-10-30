# Correct.Email - Real-Time API JavaScript Client

The Client created by Correct.Email team was written in native JavaScript to
simplify Email Validation process in browser (client side). It is an wrapper to
[HTTP Request](https://correct.email/docs/api/#http-request).

## Using the Client

You can use the Client in following ways:

### Response on callback

```javascript
var ceClient = new CEClient({
  application: 'API_KEY' // your API KEY
});

ceClient.check({ email: "clean@correct.email" }, function(response) {
  // handle response as it is described in https://correct.email/docs/api/#http-request
  // and https://correct.email/docs/api/#error-response
});
```

### Response on Promise

```javascript
var ceClient = new CEClient({
  application: 'API_KEY' // your API KEY
});

ceClient.check({ email: "clean@correct.email" })
  .then(response => {
    // handle response as it is given in https://correct.email/docs/api/#http-request
  })
  .catch(error => {
    // errors are given as JSON. More information at: https://correct.email/docs/api/#error-response
  });
```

Remember to check which browsers [can use Promises](https://caniuse.com/#feat=promises).
To make working promises in older browsers, use polyfills like a [taylorhakes promise-polyfill](https://github.com/taylorhakes/promise-polyfill).

`ip` parameter is optional in check() and checkPromise() methods.

### Using as AMD module

The Client is free to use as [RequireJS](https://requirejs.org/) module loader.

## Additional Errors provided with the Client

There are two additional errors provided with the Client:

- Request error (blocked request, etc):

```javascript
{
  status: "error",
  data: {
    id: 'request_error',
    code: 1
  },
  message: xhr.responseText
}
```

- Request aborted:

```javascript
reject({
  status: "error",
  data: {
    id: 'aborted',
    code: 0
  },
  message: 'aborted'
});
```

They can be handled in catch of Promise like every other error.

## Sandbox (testing mode)

You can use Sandbox to tests every request responses. All you need to do
is just add `sandbox: true` on init:

```javascript
var ceClient = new CEClient({
  application: '3026459d-48b7-4570-a233-081d8e97e388',
  sandbox: true
});
```

All information about Sandbox you find in our [API Docs](https://correct.email/docs/api/#sandbox).

Hint: We prefer to not use real API Key while testing with Sandbox.

## Let's cooporate

Something is missing in the Client?
Let us know! We are open to discuss, pull requests and the Client improvements.