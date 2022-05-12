"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const columns = [{
  dataField: 'name',
  text: 'Név',
  filter: true,
  filterType: 'text'
}, {
  dataField: 'occupation',
  text: 'Foglalkozás',
  filter: true,

  /* filterType: 'text' */
  filterType: 'option',
  filterOptions: [{
    id: 'frontend developer',
    value: 'frontend developer',
    text: 'frontend developer'
  }, {
    id: 'backend developer',
    value: 'backend developer',
    text: 'backend developer'
  }]
}, {
  dataField: 'id',
  text: 'Műveletek',
  formatter: (cell, row) => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("button", null, row.id), "\xA0\xA0", /*#__PURE__*/_react.default.createElement("button", null, row.id), "\xA0\xA0", /*#__PURE__*/_react.default.createElement("button", null, row.id));
  }
}];
var _default = columns;
exports.default = _default;