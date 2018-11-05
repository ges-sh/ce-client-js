(function () {
  'use strict';

  // settings = {
  //   application: [apikey],
  //   sandbox: [true/false]
  // }
  function CEClient(settings) {

    var self = this;

    if (!settings || !settings.application) {
      console.error('[ce-client]: Missing application parameter (API Key).');
      return;
    }

    var languages = ['en', 'de'];

    function findLanguage() {
      var language = settings.language || 'en_US';
      if (languages.indexOf(language.split('_')[0]) !== -1) { return language; }
      return 'en-US';
    }

    var language = findLanguage();

    var urls = {
      sandbox: 'https://api.sandbox.correct.email/v1/single/',
      real: 'https://api.correct.email/v1/single/'
    };

    var addParametersToUrl = function (url, params) {
      var values = [];
      for (var key in params) {
        if (params.hasOwnProperty(key)) {
          var value = params[key];
          values.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
        }
      }
      return values.length ? url + "?" + values.join("&") : url;
    };

    function request(url, parameters, cb) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', addParametersToUrl(url, parameters));

      xhr.setRequestHeader('Accept-Language', language);

      xhr.onabort = function () {
        cb({
          status: "error",
          data: { id: 'aborted', code: 0 },
          message: 'aborted'
        });
      };

      xhr.onload = function (e) {
        const responseType = e.target.getResponseHeader('content-type');
        const rType = responseType.split(';')[0];

        switch (rType) {
          case 'application/json':
            cb(JSON.parse(e.target.responseText));
            break;
          case 'application/octet-stream':
          case 'text/html':
            if (xhr.status >= 400) {
              cb({
                status: "error",
                data: { id: 'request_error', code: 1 },
                message: xhr.responseText
              });
              return;
            }
            cb({
              status: "success",
              data: e.target.responseText
            });
            break;
        }
      };

      xhr.send();
    }

    // Send request to check email. Response will be given via callback.
    this.check = function (parameters, callback) {
      var url = settings.sandbox ? urls.sandbox : urls.real;
      parameters = parameters || {};
      parameters.key = settings.application;
      return request(url, parameters, callback);
    };

    // Send request to check email. Response will be given via Promise object.
    this.checkPromise = function (parameters) {
      return new Promise(function (resolve, reject) {
        self.check(parameters, function (response) {
          if (response && response.status && response.status === 'success') {
            resolve(response);
            return;
          }
          reject(response);
        });
      });
    };
  }

  if (window.hasOwnProperty('define')) {
    define(function () { return CEClient; });
    return;
  }

  if (typeof exports === "object" && exports) {
    module.exports = CEClient;
    return;
  }

  window.CEClient = CEClient;
})();