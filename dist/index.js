'use strict';

exports.__esModule = true;

var _lodash = require('lodash.omit');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ourOptions = ['limit', 'offset', 'page', 'tail', 'sort'];

var applySort = function applySort(q, sort) {
  if (!Array.isArray(sort)) {
    if (typeof sort !== 'string') {
      throw new Error('sort must be a string or array');
    }
    sort = sort.split(',');
  }

  var r = q._r;
  var orderBy = sort.map(function (prop) {
    return prop.indexOf('-') === 0 ? r.desc({ index: prop.substring(1) }) : r.asc({ index: prop });
  });

  return q.orderBy.apply(q, orderBy);
};

exports.default = function (Model, options) {
  var filter = (0, _lodash2.default)(options, ourOptions);
  var limit = +options.limit || 100;
  var offset = +options.offset || 0;
  if (options.page) offset += options.page * limit;

  var q = Model.filter(filter);
  if (options.sort) {
    q = applySort(q, options.sort);
  }
  if (options.tail) {
    q = q.changes();
  } else {
    q = q.slice(offset, offset + limit);
  }

  return q;
};

module.exports = exports['default'];