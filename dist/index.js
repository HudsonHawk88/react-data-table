"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DataTable", {
  enumerable: true,
  get: function get() {
    return _DataTable.default;
  }
});

var _react = _interopRequireDefault(require("react"));

var _client = require("react-dom/client");

require("bootstrap/dist/css/bootstrap.min.css");

require("./index.css");

var _datas = _interopRequireDefault(require("./datas"));

var _columns = _interopRequireDefault(require("./columns"));

var _DataTable = _interopRequireDefault(require("./DataTable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const root = (0, _client.createRoot)(document.getElementById('root'));
const paginationOptions = {
  color: 'primary',
  count: 5,
  nextText: '>',
  previousText: '<',
  firstPageText: '<<',
  lastPageText: '>>',
  rowPerPageOptions: [{
    value: 5,
    text: '5'
  }, {
    value: 10,
    text: '10'
  }, {
    value: 25,
    text: '25'
  }]
};
root.render( /*#__PURE__*/_react.default.createElement(_DataTable.default, {
  bordered: true,
  datas: _datas.default,
  columns: _columns.default,
  paginationOptions: paginationOptions
}));