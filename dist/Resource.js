'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ramda = require('ramda');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var flatten = function flatten(arr) {
  return arr.reduce(function (result, next) {
    return result.concat(Array.isArray(next) ? flatten(next) : next);
  }, []);
};

var createOrAppend = function createOrAppend(left, right) {
  return left ? flatten([left, right]) : right;
};

var resourcesToObject = function resourcesToObject(resources) {
  if (!resources || (0, _ramda.isEmpty)(resources)) {
    return {};
  }

  var transformedResources = (0, _ramda.map)(function (value) {
    return Array.isArray(value) ? value.map(function (v) {
      return v.toObject();
    }) : value.toObject();
  }, resources);

  return { _embedded: transformedResources };
};

var linksToObject = function linksToObject(links) {
  if ((0, _ramda.isEmpty)(links)) {
    return {};
  }

  return { _links: links };
};

var objectToLinks = function objectToLinks(_links) {
  return _links || {};
};

var objectToResources = function objectToResources(_embedded) {
  if (!_embedded || (0, _ramda.isEmpty)(_embedded)) {
    return {};
  }

  return (0, _ramda.map)(function (value) {
    return Array.isArray(value) ? value.map(function (v) {
      return Resource.fromObject(v);
    }) : Resource.fromObject(value);
  }, _embedded);
};

var coerceResource = function coerceResource(resource) {
  return resource instanceof Resource ? resource : Resource.fromObject(resource);
};

var Resource = function () {
  _createClass(Resource, null, [{
    key: 'fromObject',
    value: function fromObject(_ref) {
      var _links = _ref._links,
          _embedded = _ref._embedded,
          properties = _objectWithoutProperties(_ref, ['_links', '_embedded']);

      return new Resource().addLinks(objectToLinks(_links)).addResources(objectToResources(_embedded)).addProperties(properties);
    }
  }]);

  function Resource() {
    _classCallCheck(this, Resource);

    this.links = {};
    this.embedded = {};
    this.properties = {};
  }

  _createClass(Resource, [{
    key: 'getLink',
    value: function getLink(rel) {
      return (0, _ramda.prop)(rel, this.links);
    }
  }, {
    key: 'getHref',
    value: function getHref(rel) {
      return (0, _ramda.prop)('href', this.getLink(rel) || {});
    }
  }, {
    key: 'getLinks',
    value: function getLinks() {
      return this.links;
    }
  }, {
    key: 'getHrefs',
    value: function getHrefs() {
      return (0, _ramda.pipe)((0, _ramda.map)((0, _ramda.pipe)((0, _ramda.defaultTo)({}), (0, _ramda.prop)('href'))), (0, _ramda.reject)(_ramda.isNil))(this.links);
    }
  }, {
    key: 'getResource',
    value: function getResource(key) {
      return this.embedded[key];
    }
  }, {
    key: 'getResources',
    value: function getResources() {
      return this.embedded;
    }
  }, {
    key: 'getProperty',
    value: function getProperty(key) {
      return this.properties[key];
    }
  }, {
    key: 'getProperties',
    value: function getProperties() {
      return this.properties;
    }
  }, {
    key: 'addLink',
    value: function addLink(rel, value) {
      if (!value) {
        return this;
      }

      if (typeof value === 'string') {
        return this.addLink(rel, { href: value });
      }

      this.links = _extends({}, this.links, _defineProperty({}, rel, createOrAppend(this.links[rel], value)));

      return this;
    }
  }, {
    key: 'applyToResource',
    value: function applyToResource(map, fn) {
      return (0, _ramda.toPairs)(map).reduce(fn, this);
    }
  }, {
    key: 'addLinks',
    value: function addLinks(map) {
      return this.applyToResource(map, function (resource, _ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            rel = _ref3[0],
            value = _ref3[1];

        return resource.addLink(rel, value);
      });
    }
  }, {
    key: 'addResource',
    value: function addResource(key, value) {
      var coerced = Array.isArray(value) ? value.map(function (resource) {
        return coerceResource(resource);
      }) : coerceResource(value);

      this.embedded = _extends({}, this.embedded, _defineProperty({}, key, createOrAppend(this.embedded[key], coerced)));

      return this;
    }
  }, {
    key: 'addResources',
    value: function addResources(map) {
      return this.applyToResource(map, function (resource, _ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            key = _ref5[0],
            value = _ref5[1];

        return resource.addResource(key, value);
      });
    }
  }, {
    key: 'addProperty',
    value: function addProperty(key, value) {
      this.properties = _extends({}, this.properties, _defineProperty({}, key, value));

      return this;
    }
  }, {
    key: 'addProperties',
    value: function addProperties(map) {
      return this.applyToResource(map, function (resource, _ref6) {
        var _ref7 = _slicedToArray(_ref6, 2),
            key = _ref7[0],
            value = _ref7[1];

        return resource.addProperty(key, value);
      });
    }
  }, {
    key: 'toObject',
    value: function toObject() {
      return _extends({}, linksToObject(this.links), resourcesToObject(this.embedded), this.properties);
    }
  }]);

  return Resource;
}();

module.exports = Resource;