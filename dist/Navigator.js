'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _urijs = require('urijs');

var _urijs2 = _interopRequireDefault(_urijs);

var _Resource = require('./Resource');

var _Resource2 = _interopRequireDefault(_Resource);

var _params = require('./params');

var _axiosOptions = require('./axiosOptions');

var _axiosOptions2 = _interopRequireDefault(_axiosOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var makeAbsolute = function makeAbsolute(baseUri, relativeUri) {
  return (0, _urijs2.default)(relativeUri).absoluteTo(baseUri).toString();
};

var Navigator = function () {
  _createClass(Navigator, null, [{
    key: 'discover',
    value: function discover(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return new Navigator(options).getUrl(url, {}, options.http);
    }
  }, {
    key: 'resume',
    value: function resume(location, resource) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      return new Navigator(options, { resource: resource, location: location });
    }
  }]);

  function Navigator(options) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        status = _ref.status,
        location = _ref.location,
        response = _ref.response,
        resource = _ref.resource;

    _classCallCheck(this, Navigator);

    this.options = _extends({}, Navigator.defaultOptions, options);

    this._status = status;
    this._response = response;
    this._resource = resource;
    this._location = location;
  }

  _createClass(Navigator, [{
    key: '_setResource',
    value: function _setResource(resource) {
      this._resource = resource;
      return this;
    }
  }, {
    key: '_setLocation',
    value: function _setLocation(location) {
      this._location = location;
      return this;
    }
  }, {
    key: 'location',
    value: function location() {
      return this._location;
    }
  }, {
    key: 'status',
    value: function status() {
      return this._status;
    }
  }, {
    key: 'resource',
    value: function resource() {
      return this._resource;
    }
  }, {
    key: 'getHeader',
    value: function getHeader(key) {
      return this._response.headers[key];
    }
  }, {
    key: 'resolveLink',
    value: function resolveLink(rel, params) {
      var relativeHref = this.resource().getHref(rel);

      if (!relativeHref) {
        throw new Error('Attempting to follow the link \'' + rel + '\', which does not exist');
      }

      var _resolveLink2 = (0, _params.resolveLink)(relativeHref, params),
          href = _resolveLink2.href,
          queryParams = _resolveLink2.params;

      return {
        href: makeAbsolute(this.location(), href),
        queryParams: queryParams
      };
    }
  }, {
    key: 'get',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(rel) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var _resolveLink3, href, queryParams;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _resolveLink3 = this.resolveLink(rel, params), href = _resolveLink3.href, queryParams = _resolveLink3.queryParams;
                return _context.abrupt('return', this.getUrl(href, queryParams, config));

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function get(_x4) {
        return _ref2.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: 'post',
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(rel, body) {
        var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        var _resolveLink4, href;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _resolveLink4 = this.resolveLink(rel, params), href = _resolveLink4.href;
                return _context2.abrupt('return', this.postUrl(href, body, config));

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function post(_x7, _x8) {
        return _ref3.apply(this, arguments);
      }

      return post;
    }()
  }, {
    key: 'put',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(rel, body) {
        var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        var _resolveLink5, href;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _resolveLink5 = this.resolveLink(rel, params), href = _resolveLink5.href;
                return _context3.abrupt('return', this.putUrl(href, body, config));

              case 2:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function put(_x11, _x12) {
        return _ref4.apply(this, arguments);
      }

      return put;
    }()
  }, {
    key: 'patch',
    value: function () {
      var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(rel, body) {
        var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        var _resolveLink6, href;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _resolveLink6 = this.resolveLink(rel, params), href = _resolveLink6.href;
                return _context4.abrupt('return', this.patchUrl(href, body, config));

              case 2:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function patch(_x15, _x16) {
        return _ref5.apply(this, arguments);
      }

      return patch;
    }()
  }, {
    key: 'delete',
    value: function () {
      var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(rel, body) {
        var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        var _resolveLink7, href;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _resolveLink7 = this.resolveLink(rel, params), href = _resolveLink7.href;
                return _context5.abrupt('return', this.deleteUrl(href, body, config));

              case 2:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _delete(_x19, _x20) {
        return _ref6.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: 'getUrl',
    value: function () {
      var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(url, params, config) {
        var _ref8, status, location, body, response;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.options.get(url, params, config);

              case 2:
                _ref8 = _context6.sent;
                status = _ref8.status;
                location = _ref8.location;
                body = _ref8.body;
                response = _ref8.response;
                return _context6.abrupt('return', new Navigator(this.options, { status: status, location: location, response: response, resource: _Resource2.default.fromObject(body) }));

              case 8:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getUrl(_x23, _x24, _x25) {
        return _ref7.apply(this, arguments);
      }

      return getUrl;
    }()
  }, {
    key: 'postUrl',
    value: function () {
      var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(url, body, config) {
        var _ref10, status, location, responseBody, response;

        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this.options.post(url, body, config);

              case 2:
                _ref10 = _context7.sent;
                status = _ref10.status;
                location = _ref10.location;
                responseBody = _ref10.body;
                response = _ref10.response;

                if (!(this.options.followRedirects && status === 201)) {
                  _context7.next = 9;
                  break;
                }

                return _context7.abrupt('return', new Navigator(this.options, {
                  status: status,
                  location: location,
                  response: response,
                  resource: _Resource2.default.fromObject(responseBody)
                }).followRedirect(config));

              case 9:
                return _context7.abrupt('return', new Navigator(this.options, { status: status, location: location, response: response, resource: _Resource2.default.fromObject(responseBody) }));

              case 10:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function postUrl(_x26, _x27, _x28) {
        return _ref9.apply(this, arguments);
      }

      return postUrl;
    }()
  }, {
    key: 'putUrl',
    value: function () {
      var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(url, body, config) {
        var _ref12, status, location, responseBody, response;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.options.put(url, body, config);

              case 2:
                _ref12 = _context8.sent;
                status = _ref12.status;
                location = _ref12.location;
                responseBody = _ref12.body;
                response = _ref12.response;

                if (!(this.options.followRedirects && status === 201)) {
                  _context8.next = 9;
                  break;
                }

                return _context8.abrupt('return', new Navigator(this.options, {
                  status: status,
                  location: location,
                  response: response,
                  resource: _Resource2.default.fromObject(responseBody)
                }).followRedirect(config));

              case 9:
                return _context8.abrupt('return', new Navigator(this.options, { status: status, location: location, response: response, resource: _Resource2.default.fromObject(responseBody) }));

              case 10:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function putUrl(_x29, _x30, _x31) {
        return _ref11.apply(this, arguments);
      }

      return putUrl;
    }()
  }, {
    key: 'patchUrl',
    value: function () {
      var _ref13 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9(url, body, config) {
        var _ref14, status, location, responseBody, response;

        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this.options.patch(url, body, config);

              case 2:
                _ref14 = _context9.sent;
                status = _ref14.status;
                location = _ref14.location;
                responseBody = _ref14.body;
                response = _ref14.response;

                if (!(this.options.followRedirects && status === 204)) {
                  _context9.next = 9;
                  break;
                }

                return _context9.abrupt('return', new Navigator(this.options, {
                  status: status,
                  location: location,
                  response: response,
                  resource: _Resource2.default.fromObject(responseBody)
                }).followRedirect(config));

              case 9:
                return _context9.abrupt('return', new Navigator(this.options, { status: status, location: location, response: response, resource: _Resource2.default.fromObject(responseBody) }));

              case 10:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function patchUrl(_x32, _x33, _x34) {
        return _ref13.apply(this, arguments);
      }

      return patchUrl;
    }()
  }, {
    key: 'deleteUrl',
    value: function () {
      var _ref15 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10(url, body, config) {
        var _ref16, status, location, responseBody, response;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this.options.delete(url, body, config);

              case 2:
                _ref16 = _context10.sent;
                status = _ref16.status;
                location = _ref16.location;
                responseBody = _ref16.body;
                response = _ref16.response;
                return _context10.abrupt('return', new Navigator(this.options, { status: status, location: location, response: response, resource: _Resource2.default.fromObject(responseBody) }));

              case 8:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function deleteUrl(_x35, _x36, _x37) {
        return _ref15.apply(this, arguments);
      }

      return deleteUrl;
    }()
  }, {
    key: 'followRedirect',
    value: function () {
      var _ref17 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(config) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt('return', this.getUrl(makeAbsolute(this.location(), this.getHeader('location')), {}, config));

              case 1:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function followRedirect(_x38) {
        return _ref17.apply(this, arguments);
      }

      return followRedirect;
    }()
  }]);

  return Navigator;
}();

Navigator.defaultOptions = _extends({}, _axiosOptions2.default, {
  followRedirects: true
});


module.exports = Navigator;