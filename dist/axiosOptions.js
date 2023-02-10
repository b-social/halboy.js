'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axiosGet = function axiosGet(url, params, config) {
  return _axios2.default.get(url, _extends({}, config, { params: params, validateStatus: function validateStatus() {
      return true;
    } })).then(function (response) {
    return {
      status: response.status,
      body: response.data,
      location: response.config.url,
      response: response
    };
  });
};

var axiosPost = function axiosPost(url, body, config) {
  return _axios2.default.post(url, body, _extends({}, config, { validateStatus: function validateStatus() {
      return true;
    } })).then(function (response) {
    return {
      status: response.status,
      body: response.data,
      location: response.config.url,
      response: response
    };
  });
};

var axiosPut = function axiosPut(url, body, config) {
  return _axios2.default.put(url, body, _extends({}, config, { validateStatus: function validateStatus() {
      return true;
    } })).then(function (response) {
    return {
      status: response.status,
      body: response.data,
      location: response.config.url,
      response: response
    };
  });
};

var axiosPatch = function axiosPatch(url, body, config) {
  return _axios2.default.patch(url, body, _extends({}, config, { validateStatus: function validateStatus() {
      return true;
    } })).then(function (response) {
    return {
      status: response.status,
      body: response.data,
      location: response.config.url,
      response: response
    };
  });
};

var axiosDelete = function axiosDelete(url, body, config) {
  return _axios2.default.delete(url, _extends({}, config, { data: body, validateStatus: function validateStatus() {
      return true;
    } })).then(function (response) {
    return {
      status: response.status,
      body: response.data,
      location: response.config.url,
      response: response
    };
  });
};

module.exports = {
  get: axiosGet,
  post: axiosPost,
  put: axiosPut,
  patch: axiosPatch,
  delete: axiosDelete
};