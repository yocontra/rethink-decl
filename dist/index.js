'use strict';

exports.__esModule = true;

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ourOptions = ['limit', 'offset', 'page', 'tail'];

exports.default = function (Model, options) {
  var filter = (0, _lodash2.default)(options, ourOptions);
  var limit = +options.limit || 100;
  var offset = +options.offset || 0;
  if (options.page) offset += options.page * limit;

  var q = Model.filter(filter);
  if (options.tail) {
    q = q.changes();
  } else {
    q = q.slice(offset, offset + limit);
  }

  return q;
};

module.exports = exports['default'];