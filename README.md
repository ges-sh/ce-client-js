# Correct.Email - Real-Time API JavaScript Client

The Client created by Correct.Email team was written in native JavaScript to
simplify Email Validation process in browser (client side). It is an wrapper to
[HTTP Request](https://correct.email/docs/api/#http-request) where [Promise Polyfill](https://github.com/taylorhakes/promise-polyfill) was used.

## Using the Client

To use the Client, just write following code:

```javascript
var ceClient = new CEClient({
  application: '3026459d-48b7-4570-a233-081d8e97e388'
});
ceClient.check({ email: "blah@blah.com" })
  .then(response => {
    // handle response as it is given in https://correct.email/docs/api/#http-request
  })
  .catch(error => {
    // errors are given as JSON. More information at: https://correct.email/docs/api/#error-response
  });
```

And that's it!

hint: `ip` parameter is optional in sendRequest() method.

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