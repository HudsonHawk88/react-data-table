"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.parse-int.js");

var _react = _interopRequireWildcard(require("react"));

var _reactstrap = require("reactstrap");

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const DataTable = _ref => {
  let {
    className = 'react-data-table',
    datas,
    columns,
    paginationOptions,
    bordered = false,
    striped = false
  } = _ref;
  const [filters, setFilters] = (0, _react.useState)({});
  const [filtered, setFiltered] = (0, _react.useState)([]);
  const [count, setCount] = (0, _react.useState)(paginationOptions && paginationOptions.count ? paginationOptions.count : 5);
  const [currentPage, setCurrentPage] = (0, _react.useState)(0);
  const [pageButtons, setPageButtons] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    setFiltered(datas);
    /* if (paginationOptions) {
        setCount(paginationOptions.count || 5);
    } */
  }, [datas]);
  const setDefaultFilters = (0, _react.useCallback)(() => {
    const cols = columns || [];
    let filterObj = {};
    cols.forEach(col => {
      if (col.filter) {
        if (col.filterType === 'text') {
          filterObj[col.dataField] = '';
        } else if (col.filterType === 'option') {
          filterObj[col.dataField] = '';
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
          const defaultValue = col.defaultValue || '';
          return /*#__PURE__*/_react.default.createElement("th", {
            key: col.text
          }, col.text, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_reactstrap.Input, {
            name: col.dataField,
            type: "text",
            placeholder: defaultValue,
            value: filters[col.dataField],
            onChange: handleFilterChange
          }));
        }

      case 'option':
        {
          const filterOptions = col.filterOptions || [];
          const defaultValue = col.defaultValue || 'Kérjük válasszon...';
          return /*#__PURE__*/_react.default.createElement("th", {
            key: col.text
          }, col.text, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_reactstrap.Input, {
            name: col.dataField,
            type: "select",
            onChange: handleFilterChange
          }, /*#__PURE__*/_react.default.createElement("option", {
            key: 'filter_' + filterOptions.id,
            value: ""
          }, defaultValue), filterOptions.map(filterOption => {
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
  }, [filters, datas, getFilterClause]);
  const getFirstIndex = (0, _react.useCallback)(() => {
    const cP = parseInt(currentPage, 10);
    const firstIndex = cP - 2 < 0 ? 0 : cP - 2;
    return firstIndex;
  }, [currentPage]);
  const getLastIndex = (0, _react.useCallback)(() => {
    const pageCount = pageButtons.length;
    const cP = parseInt(currentPage, 10);
    const lastIndex = cP + 3 > pageCount ? pageCount : cP + 3;
    return lastIndex;
  }, [currentPage, pageButtons.length]);
  const createPageButtons = (0, _react.useCallback)(filteredData => {
    const length = filteredData.length;
    const pageCount = Math.ceil(length / count);
    let pageButtonsArray = [];

    for (let i = 0; i < pageCount; i++) {
      pageButtonsArray.push({
        key: i,
        onClick: () => onPageClick(i),
        text: i + 1
      });
    }

    setPageButtons(pageButtonsArray);
  }, [count]);
  const handlePageChange = (0, _react.useCallback)(filteredData => {
    const firstIndex = count * currentPage;
    const lastIndex = firstIndex + parseInt(count, 10);
    let filteredArray = [];

    for (let i = firstIndex; i < lastIndex; i++) {
      if (filteredData[i]) {
        filteredArray.push(filteredData[i]);
      }
    }

    setFiltered(filteredArray);
  }, [count, currentPage]);
  (0, _react.useMemo)(() => {
    const filteredData = filteringData();
    handlePageChange(filteredData);
    createPageButtons(filteredData);
  }, [filteringData, handlePageChange, createPageButtons]);

  const renderCell = (col, row) => {
    const {
      formatter,
      hidden
    } = col;
    const name = col['dataField'];
    let cell = '';

    if (col && row && !hidden) {
      if (formatter && typeof formatter === 'function') {
        cell = /*#__PURE__*/_react.default.createElement("td", {
          key: 'cell_' + row.id
        }, col.formatter(col, row));
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
      className: className,
      striped: striped ? striped : false,
      bordered: bordered ? bordered : false
    }, /*#__PURE__*/_react.default.createElement("thead", null, renderHeaderCells()), /*#__PURE__*/_react.default.createElement("tbody", null, rows.map(row => {
      return /*#__PURE__*/_react.default.createElement("tr", {
        key: 'row_' + row.id
      }, renderCells(row));
    })));
  };

  const onNextClick = () => {
    setCurrentPage(currentPage + 1);
  };

  const onPreviousClick = () => {
    setCurrentPage(currentPage - 1);
  };

  const onFirstClick = () => {
    setCurrentPage(0);
  };

  const onLastClick = () => {
    setCurrentPage(pageButtons.length - 1);
  };

  const onPageClick = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const renderRowPerPage = rowPerPageOptions => {
    const defaultRowPerPageStyle = {
      width: 'fit-content',
      float: 'left'
    };
    return /*#__PURE__*/_react.default.createElement(_reactstrap.Input, {
      className: "react-data-table-pagination-rowperpage",
      style: defaultRowPerPageStyle,
      type: "select",
      value: count,
      onChange: e => {
        setCount(e.target.value);
        setCurrentPage(0);
      }
    }, rowPerPageOptions && Array.isArray(rowPerPageOptions) && rowPerPageOptions.length > 0 && rowPerPageOptions.map(opt => {
      const {
        value,
        text
      } = opt;
      return /*#__PURE__*/_react.default.createElement("option", {
        key: value,
        value: value
      }, text);
    }));
  };

  const renderPageButtons = (color, nextText, previousText, firstPageText, lastPageText) => {
    const defaultPageButtonsStyle = {
      float: 'right'
    };
    const firstIndex = getFirstIndex();
    const lastIndex = getLastIndex();
    let item = '';
    let buttons = [];

    for (let i = firstIndex; i < lastIndex; i++) {
      item = /*#__PURE__*/_react.default.createElement(_reactstrap.Button, {
        color: color,
        outline: currentPage !== pageButtons[i].key,
        key: pageButtons[i].key,
        onClick: pageButtons[i].onClick
      }, pageButtons[i].text);
      buttons.push(item);
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      className: "react-data-table-pagination-buttons",
      style: defaultPageButtonsStyle
    }, /*#__PURE__*/_react.default.createElement(_reactstrap.Button, {
      outline: true,
      color: color,
      hidden: currentPage === 0,
      onClick: () => onFirstClick()
    }, firstPageText), /*#__PURE__*/_react.default.createElement(_reactstrap.Button, {
      outline: true,
      color: color,
      hidden: currentPage === 0,
      onClick: () => onPreviousClick()
    }, previousText), buttons.map(butt => {
      return butt;
    }), /*#__PURE__*/_react.default.createElement(_reactstrap.Button, {
      outline: true,
      color: color,
      hidden: currentPage === pageButtons.length - 1,
      onClick: () => onNextClick()
    }, nextText), /*#__PURE__*/_react.default.createElement(_reactstrap.Button, {
      outline: true,
      color: color,
      hidden: currentPage === pageButtons.length - 1,
      onClick: () => onLastClick()
    }, lastPageText));
  };

  const renderPagination = () => {
    if (paginationOptions && typeof paginationOptions === 'object' && filtered.length > 0) {
      const {
        color,
        nextText,
        previousText,
        firstPageText,
        lastPageText,
        rowPerPageOptions
      } = paginationOptions;
      const defaultPaginationStyle = {
        width: '100%',
        clear: 'both',
        padding: '10px'
      };
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "react-data-table-paginator",
        style: defaultPaginationStyle
      }, renderRowPerPage(rowPerPageOptions), renderPageButtons(color, nextText, previousText, firstPageText, lastPageText));
    }
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderTable(), renderPagination());
};

var _default = DataTable;
exports.default = _default;
DataTable.propTypes = {
  className: _propTypes.default.string,
  datas: _propTypes.default.array.isRequired,
  columns: _propTypes.default.array.isRequired,
  paginationOptions: _propTypes.default.object,
  bordered: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool]),
  striped: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.bool])
};