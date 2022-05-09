"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.to-string.js");

var _react = _interopRequireWildcard(require("react"));

var _reactstrap = require("reactstrap");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const DataTable = _ref => {
  let {
    datas,
    columns,
    bordered = false,
    striped = false
  } = _ref;
  const [filters, setFilters] = (0, _react.useState)({});
  const [filtered, setFiltered] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    setFiltered(datas);
  }, [datas]);
  const setDefaultFilters = (0, _react.useCallback)(() => {
    const cols = columns || [];
    let filterObj = {};
    cols.forEach(col => {
      if (col.filter) {
        if (col.filterType === 'text') {
          filterObj[col.dataField] = '';
          /*                     filterArray.push({ [col.dataField]: '' }) */
        } else if (col.filterType === 'option') {
          filterObj[col.dataField] = '';
          /*                     filterArray.push({ [col.dataField]: ''}) */
        }
      }
    });
    setFilters(filterObj);
  }, [columns]);
  (0, _react.useEffect)(() => {
    setDefaultFilters();
  }, [setDefaultFilters]);

  const handleFilterChange = e => {
    const {
      target
    } = e;
    const {
      name,
      value
    } = target;
    setFilters(_objectSpread(_objectSpread({}, filters), {}, {
      [name]: value
    }));
  };

  const getFilter = col => {
    const filterType = col.filterType;

    switch (filterType) {
      case 'text':
        {
          return /*#__PURE__*/_react.default.createElement("th", {
            key: col.text
          }, col.text, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_reactstrap.Input, {
            name: col.dataField,
            type: "text",
            value: filters[col.dataField] || '',
            onChange: handleFilterChange
          }));
        }

      case 'option':
        {
          let filterOptions = col.filterOptions || [];
          /* filterOptions.push({ id: 'default', value: '', text: 'kérjük válasszon...' }) */

          return /*#__PURE__*/_react.default.createElement("th", {
            key: col.text
          }, col.text, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_reactstrap.Input, {
            name: col.dataField,
            type: "select",
            onChange: handleFilterChange
          }, /*#__PURE__*/_react.default.createElement("option", {
            key: 'filter_' + filterOptions.id,
            value: ""
          }, "K\xE9rj\xFCk v\xE1lasszon..."), filterOptions.map(filterOption => {
            return /*#__PURE__*/_react.default.createElement("option", {
              key: 'filter_' + filterOption.id,
              value: filterOption.value
            }, filterOption.text);
          })));
        }

      default:
        {
          return /*#__PURE__*/_react.default.createElement("th", {
            key: col.text
          }, col.text);
        }
    }
  };

  const renderHeaderCells = () => {
    const cols = columns || [];
    let cell = '';
    return /*#__PURE__*/_react.default.createElement("tr", null, cols.map(col => {
      if (!col.hidden) {
        cell = getFilter(col);
      }

      return cell;
    }));
  };

  const getFilterClause = (0, _react.useCallback)((key, rowData) => {
    const ccc = columns.find(c => c['dataField'] === key);

    if (ccc.filterType === 'text') {
      return rowData[key].toLowerCase().indexOf(filters[key].toLowerCase()) === -1;
    }

    if (ccc.filterType === 'option') {
      return rowData[key] !== filters[key];
    }
  }, [columns, filters]);
  const filteringData = (0, _react.useCallback)(() => {
    let newDatas = datas;
    newDatas = datas.filter(rowData => {
      let res = true;

      for (let key in filters) {
        if (filters[key] !== '') {
          if (getFilterClause(key, rowData)) {
            res = false;
          }
        }
      }

      return res;
    });
    return newDatas;
    /* setFiltered(newDatas) */
  }, [filters, datas, getFilterClause]);
  (0, _react.useMemo)(() => {
    const filteredData = filteringData();
    setFiltered(filteredData);
  }, [filteringData]);

  const renderCell = (col, row) => {
    const {
      formatter,
      hidden
    } = col;
    const name = col['dataField'];
    let cell = '';

    if (col && row && !hidden) {
      if (formatter && typeof formatter === 'function') {
        cell = col.formatter(col, row);
      } else {
        cell = /*#__PURE__*/_react.default.createElement("td", {
          key: 'cell_' + name + row.id
        }, row[name]);
      }
    }

    return cell;
  };

  const renderCells = r => {
    const row = r || {};
    const cols = columns || [];
    return cols.map(col => {
      return renderCell(col, row);
    });
  };

  const renderTable = () => {
    const rows = filtered || [];
    return /*#__PURE__*/_react.default.createElement(_reactstrap.Table, {
      striped: striped,
      bordered: bordered
    }, /*#__PURE__*/_react.default.createElement("thead", null, renderHeaderCells()), /*#__PURE__*/_react.default.createElement("tbody", null, rows.map((row, index) => {
      return /*#__PURE__*/_react.default.createElement("tr", {
        key: 'row_' + index.toString()
      }, renderCells(row));
    })));
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderTable());
};

var _default = DataTable;
exports.default = _default;