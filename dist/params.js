'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveLink = undefined;

var _urijs = require('urijs');

var _urijs2 = _interopRequireDefault(_urijs);

var _URITemplate = require('urijs/src/URITemplate');

var _URITemplate2 = _interopRequireDefault(_URITemplate);

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolveLink = exports.resolveLink = function resolveLink(templatedUrl, params) {
  var template = (0, _URITemplate2.default)(templatedUrl).parse();
  var variables = template.parts.reduce(function (accumulator, part) {
    if (part.variables) {
      return (0, _ramda.concat)(part.variables.map(function (variable) {
        return variable.name;
      }), accumulator);
    }
    return accumulator;
  }, []);
  var url = template.expand(params);
  var queryObject = (0, _urijs2.default)(url).query(true);
  var fullParams = (0, _ramda.merge)((0, _ramda.omit)(variables, params), queryObject);
  var urlWithoutQueryString = (0, _urijs2.default)(url).query('').toString();

  return {
    href: urlWithoutQueryString,
    params: fullParams
  };
};