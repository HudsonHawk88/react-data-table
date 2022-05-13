"use strict";
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
const react_1 = __importStar(require("react"));
const reactstrap_1 = require("reactstrap");
const prop_types_1 = __importDefault(require("prop-types"));
const DataTable = ({ className = 'react-data-table', datas, columns, paginationOptions, bordered = false, striped = false }) => {
    const [filters, setFilters] = (0, react_1.useState)({});
    const [filtered, setFiltered] = (0, react_1.useState)([]);
    const [count, setCount] = (0, react_1.useState)(paginationOptions && paginationOptions.count ? paginationOptions.count : 5);
    const [currentPage, setCurrentPage] = (0, react_1.useState)(0);
    const [pageButtons, setPageButtons] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        setFiltered(datas);
        /* if (paginationOptions) {
            setCount(paginationOptions.count || 5);
        } */
    }, [datas]);
    const setDefaultFilters = (0, react_1.useCallback)(() => {
        const cols = columns || [];
        let filterObj = {};
        cols.forEach((col) => {
            if (col.filter) {
                if (col.filterType === 'textFilter') {
                    Object.assign(filterObj, { [col.dataField]: '' });
                }
                else if (col.filterType === 'optionFilter') {
                    Object.assign(filterObj, { [col.dataField]: '' });
                }
            }
        });
        setFilters(filterObj);
    }, [columns]);
    (0, react_1.useEffect)(() => {
        setDefaultFilters();
    }, [setDefaultFilters]);
    const handleFilterChange = (e) => {
        const { target } = e;
        const { name, value } = target;
        setFilters({
            ...filters,
            [name]: value
        });
    };
    const getFilter = (col) => {
        const filterType = col.filterType;
        switch (filterType) {
            case 'textFilter': {
                const defaultValue = col.defaultValue || '';
                return (<th key={col.text}>{col.text}<br />
                        <reactstrap_1.Input name={col.dataField} type='text' placeholder={defaultValue} value={filters[col.dataField]} onChange={handleFilterChange}/>
                    </th>);
            }
            case 'optionFilter': {
                const filterOptions = col.filterOptions || [];
                const defaultValue = col.defaultValue || 'Kérjük válasszon...';
                return (<th key={col.text}>{col.text}<br />
                        <reactstrap_1.Input name={col.dataField} type='select' onChange={handleFilterChange}>
                            <option key={'filter_' + filterOptions.id} value=''>{defaultValue}</option>
                            {filterOptions.map((filterOption) => {
                        return <option key={'filter_' + filterOption.id} value={filterOption.value}>{filterOption.text}</option>;
                    })}
                        </reactstrap_1.Input>
                    </th>);
            }
            default: {
                return <th key={col.text}>{col.text}</th>;
            }
        }
    };
    const renderHeaderCells = () => {
        const cols = columns || [];
        return (<tr>
                {cols.map((col) => {
                return !col.hidden && getFilter(col);
            })}
            </tr>);
    };
    const getFilterClause = (0, react_1.useCallback)((key, rowData) => {
        const ccc = columns.find((c) => c['dataField'] === key);
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
    const filteringData = (0, react_1.useCallback)(() => {
        let newDatas = datas;
        newDatas = datas.filter((rowData) => {
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
    const getFirstIndex = (0, react_1.useCallback)(() => {
        const cP = currentPage;
        const firstIndex = ((cP - 2) < 0) ? 0 : (cP - 2);
        return firstIndex;
    }, [currentPage]);
    const getLastIndex = (0, react_1.useCallback)(() => {
        const pageCount = pageButtons.length;
        const cP = currentPage;
        const lastIndex = ((cP + 3) > pageCount) ? pageCount : (cP + 3);
        return lastIndex;
    }, [currentPage, pageButtons.length]);
    const createPageButtons = (0, react_1.useCallback)((filteredData) => {
        const length = filteredData.length;
        const pageCount = Math.ceil(length / count);
        let pageButtonsArray = [];
        for (let i = 0; i < pageCount; i++) {
            pageButtonsArray.push({ key: i, onClick: () => onPageClick(i), text: i + 1 });
        }
        setPageButtons(pageButtonsArray);
    }, [count]);
    const handlePageChange = (0, react_1.useCallback)((filteredData) => {
        const firstIndex = count * currentPage;
        const lastIndex = firstIndex + count;
        let filteredArray = [];
        for (let i = firstIndex; i < lastIndex; i++) {
            if (filteredData[i]) {
                filteredArray.push(filteredData[i]);
            }
        }
        setFiltered(filteredArray);
    }, [count, currentPage]);
    (0, react_1.useMemo)(() => {
        const filteredData = filteringData();
        handlePageChange(filteredData);
        createPageButtons(filteredData);
    }, [filteringData, handlePageChange, createPageButtons]);
    const renderCell = (col, row) => {
        const { formatter, hidden } = col;
        const name = col['dataField'];
        let cell = '';
        if (col && row && !hidden) {
            if (formatter && typeof formatter === 'function') {
                return <td key={'cell_' + row.id}>{col.formatter(col, row)}</td>;
            }
            else {
                return <td key={'cell_' + name + row.id}>{row[name]}</td>;
            }
        }
        return cell;
    };
    const renderCells = (r) => {
        const row = r || {};
        const cols = columns || [];
        return (cols.map((col) => {
            return renderCell(col, row);
        }));
    };
    const renderTable = () => {
        const rows = filtered || [];
        return (<reactstrap_1.Table className={className} striped={striped ? striped : false} bordered={bordered ? bordered : false}>
                <thead>
                    {renderHeaderCells()}
                </thead>
                <tbody>
                    {rows.map((row) => {
                return (<tr key={'row_' + row.id}>
                                {renderCells(row)}
                            </tr>);
            })}
                </tbody>
            </reactstrap_1.Table>);
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
    const onPageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const renderRowPerPage = (rowPerPageOptions) => {
        const defaultRowPerPageStyle = {
            width: 'fit-content',
            float: 'left'
        };
        return (<reactstrap_1.Input className='react-data-table-pagination-rowperpage' style={defaultRowPerPageStyle} type='select' value={count} onChange={(e) => { setCount(parseInt(e.target.value, 10)); setCurrentPage(0); }}>
                {rowPerPageOptions && Array.isArray(rowPerPageOptions) && rowPerPageOptions.length > 0 && (rowPerPageOptions.map((opt) => {
                const { value, text } = opt;
                return (<option key={value} value={value}>{text}</option>);
            }))}
            </reactstrap_1.Input>);
    };
    const renderPageButtons = (color, nextText, previousText, firstPageText, lastPageText) => {
        const defaultPageButtonsStyle = {
            float: 'right'
        };
        const firstIndex = getFirstIndex();
        const lastIndex = getLastIndex();
        let buttons = [];
        for (let i = firstIndex; i < lastIndex; i++) {
            buttons.push(<reactstrap_1.Button color={color} outline={currentPage !== pageButtons[i].key} key={pageButtons[i].key} onClick={pageButtons[i].onClick}>{pageButtons[i].text}</reactstrap_1.Button>);
        }
        return (<div className='react-data-table-pagination-buttons' style={defaultPageButtonsStyle}>
                <reactstrap_1.Button outline color={color} hidden={currentPage === 0} onClick={() => onFirstClick()}>{firstPageText}</reactstrap_1.Button>
                <reactstrap_1.Button outline color={color} hidden={currentPage === 0} onClick={() => onPreviousClick()}>{previousText}</reactstrap_1.Button>
        
                
                {buttons.map((butt) => {
                return butt;
            })}
                <reactstrap_1.Button outline color={color} hidden={currentPage === pageButtons.length - 1} onClick={() => onNextClick()}>{nextText}</reactstrap_1.Button>
                <reactstrap_1.Button outline color={color} hidden={currentPage === pageButtons.length - 1} onClick={() => onLastClick()}>{lastPageText}</reactstrap_1.Button>
            </div>);
    };
    const renderPagination = () => {
        if (paginationOptions && typeof paginationOptions === 'object' && filtered.length > 0) {
            const { color, nextText = '>', previousText = '<', firstPageText = '<<', lastPageText = '>>', rowPerPageOptions } = paginationOptions;
            const defaultPaginationStyle = {
                width: '100%',
                clear: 'both'
            };
            return (<div className='react-data-table-paginator' style={defaultPaginationStyle}>
                    {renderRowPerPage(rowPerPageOptions)}
                    {renderPageButtons(color, nextText, previousText, firstPageText, lastPageText)}
                </div>);
        }
        else {
            return '';
        }
    };
    return (<react_1.default.Fragment>
            {renderTable()}
            {renderPagination()}
        </react_1.default.Fragment>);
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
