"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var reactstrap_1 = require("reactstrap");
var prop_types_1 = __importDefault(require("prop-types"));
require("./index.css");
require("bootstrap/dist/css/bootstrap.min.css");
var DataTable = function (_a) {
    var _b = _a.className, className = _b === void 0 ? 'react-data-table' : _b, datas = _a.datas, columns = _a.columns, paginationOptions = _a.paginationOptions, _c = _a.bordered, bordered = _c === void 0 ? false : _c, _d = _a.striped, striped = _d === void 0 ? false : _d;
    var _e = (0, react_1.useState)({}), filters = _e[0], setFilters = _e[1];
    var _f = (0, react_1.useState)([]), filtered = _f[0], setFiltered = _f[1];
    var _g = (0, react_1.useState)(paginationOptions && paginationOptions.count ? paginationOptions.count : 5), count = _g[0], setCount = _g[1];
    var _h = (0, react_1.useState)(0), currentPage = _h[0], setCurrentPage = _h[1];
    var _j = (0, react_1.useState)([]), pageButtons = _j[0], setPageButtons = _j[1];
    (0, react_1.useEffect)(function () {
        setFiltered(datas);
        /* if (paginationOptions) {
            setCount(paginationOptions.count || 5);
        } */
    }, [datas]);
    var setDefaultFilters = (0, react_1.useCallback)(function () {
        var cols = columns || [];
        var filterObj = {};
        cols.forEach(function (col) {
            var _a, _b;
            if (col.filter) {
                if (col.filterType === 'textFilter') {
                    Object.assign(filterObj, (_a = {}, _a[col.dataField] = '', _a));
                }
                else if (col.filterType === 'optionFilter') {
                    Object.assign(filterObj, (_b = {}, _b[col.dataField] = '', _b));
                }
            }
        });
        setFilters(filterObj);
    }, [columns]);
    (0, react_1.useEffect)(function () {
        setDefaultFilters();
    }, [setDefaultFilters]);
    var handleFilterChange = function (e) {
        var _a;
        var target = e.target;
        var name = target.name, value = target.value;
        setFilters(__assign(__assign({}, filters), (_a = {}, _a[name] = value, _a)));
    };
    var getFilter = function (col) {
        var filterType = col.filterType;
        switch (filterType) {
            case 'textFilter': {
                var defaultValue = col.defaultValue || '';
                return (react_1.default.createElement("th", { key: col.text },
                    col.text,
                    react_1.default.createElement("br", null),
                    react_1.default.createElement(reactstrap_1.Input, { name: col.dataField, type: 'text', placeholder: defaultValue, value: filters[col.dataField], onChange: handleFilterChange })));
            }
            case 'optionFilter': {
                var filterOptions = col.filterOptions || [];
                var defaultValue = col.defaultValue || 'Kérjük válasszon...';
                return (react_1.default.createElement("th", { key: col.text },
                    col.text,
                    react_1.default.createElement("br", null),
                    react_1.default.createElement(reactstrap_1.Input, { name: col.dataField, type: 'select', onChange: handleFilterChange },
                        react_1.default.createElement("option", { key: 'filter_' + filterOptions.id, value: '' }, defaultValue),
                        filterOptions.map(function (filterOption) {
                            return react_1.default.createElement("option", { key: 'filter_' + filterOption.id, value: filterOption.value }, filterOption.text);
                        }))));
            }
            default: {
                return react_1.default.createElement("th", { key: col.text }, col.text);
            }
        }
    };
    var renderHeaderCells = function () {
        var cols = columns || [];
        return (react_1.default.createElement("tr", null, cols.map(function (col) {
            return !col.hidden && getFilter(col);
        })));
    };
    var getFilterClause = (0, react_1.useCallback)(function (key, rowData) {
        var ccc = columns.find(function (c) { return c['dataField'] === key; });
        if (ccc && ccc.filterType === 'textFilter') {
            return rowData[key].toLowerCase().indexOf(filters[key].toLowerCase()) === -1;
        }
        if (ccc && ccc.filterType === 'optionFilter') {
            return rowData[key] !== filters[key];
        }
        else {
            return undefined;
        }
    }, [columns, filters]);
    var filteringData = (0, react_1.useCallback)(function () {
        var newDatas = datas;
        newDatas = datas.filter(function (rowData) {
            var res = true;
            for (var key in filters) {
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
    var getFirstIndex = (0, react_1.useCallback)(function () {
        var cP = currentPage;
        var firstIndex = ((cP - 2) < 0) ? 0 : (cP - 2);
        return firstIndex;
    }, [currentPage]);
    var getLastIndex = (0, react_1.useCallback)(function () {
        var pageCount = pageButtons.length;
        var cP = currentPage;
        var lastIndex = ((cP + 3) > pageCount) ? pageCount : (cP + 3);
        return lastIndex;
    }, [currentPage, pageButtons.length]);
    var createPageButtons = (0, react_1.useCallback)(function (filteredData) {
        var length = filteredData.length;
        var pageCount = Math.ceil(length / count);
        var pageButtonsArray = [];
        var _loop_1 = function (i) {
            pageButtonsArray.push({ key: i, onClick: function () { return onPageClick(i); }, text: i + 1 });
        };
        for (var i = 0; i < pageCount; i++) {
            _loop_1(i);
        }
        setPageButtons(pageButtonsArray);
    }, [count]);
    var handlePageChange = (0, react_1.useCallback)(function (filteredData) {
        var firstIndex = count * currentPage;
        var lastIndex = firstIndex + count;
        var filteredArray = [];
        for (var i = firstIndex; i < lastIndex; i++) {
            if (filteredData[i]) {
                filteredArray.push(filteredData[i]);
            }
        }
        setFiltered(filteredArray);
    }, [count, currentPage]);
    (0, react_1.useMemo)(function () {
        var filteredData = filteringData();
        handlePageChange(filteredData);
        createPageButtons(filteredData);
    }, [filteringData, handlePageChange, createPageButtons]);
    var renderCell = function (col, row) {
        var formatter = col.formatter, hidden = col.hidden;
        var name = col['dataField'];
        var cell = '';
        if (col && row && !hidden) {
            if (formatter && typeof formatter === 'function') {
                return react_1.default.createElement("td", { key: 'cell_' + row.id }, col.formatter(col, row));
            }
            else {
                return react_1.default.createElement("td", { key: 'cell_' + name + row.id }, row[name]);
            }
        }
        return cell;
    };
    var renderCells = function (r) {
        var row = r || {};
        var cols = columns || [];
        return (cols.map(function (col) {
            return renderCell(col, row);
        }));
    };
    var renderTable = function () {
        var rows = filtered || [];
        return (react_1.default.createElement(reactstrap_1.Table, { className: className, striped: striped ? striped : false, bordered: bordered ? bordered : false },
            react_1.default.createElement("thead", null, renderHeaderCells()),
            react_1.default.createElement("tbody", null, rows.map(function (row) {
                return (react_1.default.createElement("tr", { key: 'row_' + row.id }, renderCells(row)));
            }))));
    };
    var onNextClick = function () {
        setCurrentPage(currentPage + 1);
    };
    var onPreviousClick = function () {
        setCurrentPage(currentPage - 1);
    };
    var onFirstClick = function () {
        setCurrentPage(0);
    };
    var onLastClick = function () {
        setCurrentPage(pageButtons.length - 1);
    };
    var onPageClick = function (pageNumber) {
        setCurrentPage(pageNumber);
    };
    var renderRowPerPage = function (rowPerPageOptions) {
        var defaultRowPerPageStyle = {
            width: 'fit-content',
            float: 'left'
        };
        return (react_1.default.createElement(reactstrap_1.Input, { className: 'react-data-table-pagination-rowperpage', style: defaultRowPerPageStyle, type: 'select', value: count, onChange: function (e) { setCount(parseInt(e.target.value, 10)); setCurrentPage(0); } }, rowPerPageOptions && Array.isArray(rowPerPageOptions) && rowPerPageOptions.length > 0 && (rowPerPageOptions.map(function (opt) {
            var value = opt.value, text = opt.text;
            return (react_1.default.createElement("option", { key: value, value: value }, text));
        }))));
    };
    var renderPageButtons = function (color, nextText, previousText, firstPageText, lastPageText) {
        var defaultPageButtonsStyle = {
            float: 'right'
        };
        var firstIndex = getFirstIndex();
        var lastIndex = getLastIndex();
        var buttons = [];
        for (var i = firstIndex; i < lastIndex; i++) {
            buttons.push(react_1.default.createElement(reactstrap_1.Button, { color: color, outline: currentPage !== pageButtons[i].key, key: pageButtons[i].key, onClick: pageButtons[i].onClick }, pageButtons[i].text));
        }
        return (react_1.default.createElement("div", { className: 'react-data-table-pagination-buttons', style: defaultPageButtonsStyle },
            react_1.default.createElement(reactstrap_1.Button, { outline: true, color: color, hidden: currentPage === 0, onClick: function () { return onFirstClick(); } }, firstPageText),
            react_1.default.createElement(reactstrap_1.Button, { outline: true, color: color, hidden: currentPage === 0, onClick: function () { return onPreviousClick(); } }, previousText),
            buttons.map(function (butt) {
                return butt;
            }),
            react_1.default.createElement(reactstrap_1.Button, { outline: true, color: color, hidden: currentPage === pageButtons.length - 1, onClick: function () { return onNextClick(); } }, nextText),
            react_1.default.createElement(reactstrap_1.Button, { outline: true, color: color, hidden: currentPage === pageButtons.length - 1, onClick: function () { return onLastClick(); } }, lastPageText)));
    };
    var renderPagination = function () {
        if (paginationOptions && typeof paginationOptions === 'object' && filtered.length > 0) {
            var color = paginationOptions.color, _a = paginationOptions.nextText, nextText = _a === void 0 ? '>' : _a, _b = paginationOptions.previousText, previousText = _b === void 0 ? '<' : _b, _c = paginationOptions.firstPageText, firstPageText = _c === void 0 ? '<<' : _c, _d = paginationOptions.lastPageText, lastPageText = _d === void 0 ? '>>' : _d, rowPerPageOptions = paginationOptions.rowPerPageOptions;
            var defaultPaginationStyle = {
                width: '100%',
                clear: 'both'
            };
            return (react_1.default.createElement("div", { className: 'react-data-table-paginator', style: defaultPaginationStyle },
                renderRowPerPage(rowPerPageOptions),
                renderPageButtons(color, nextText, previousText, firstPageText, lastPageText)));
        }
        else {
            return '';
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        renderTable(),
        renderPagination()));
};
exports.default = DataTable;
DataTable.propTypes = {
    className: prop_types_1.default.string,
    datas: prop_types_1.default.array.isRequired,
    columns: prop_types_1.default.array.isRequired,
    paginationOptions: prop_types_1.default.shape({
        color: prop_types_1.default.string,
        count: prop_types_1.default.number.isRequired,
        nextText: prop_types_1.default.string,
        previousText: prop_types_1.default.string,
        firstPageText: prop_types_1.default.string,
        lastPageText: prop_types_1.default.string,
        rowPerPageOptions: prop_types_1.default.arrayOf(prop_types_1.default.shape({
            value: prop_types_1.default.number.isRequired,
            text: prop_types_1.default.string.isRequired
        }))
    }),
    bordered: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.bool]),
    striped: prop_types_1.default.oneOfType([prop_types_1.default.string, prop_types_1.default.bool])
};
//# sourceMappingURL=DataTable.js.map