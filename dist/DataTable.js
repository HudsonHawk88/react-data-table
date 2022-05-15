import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Table, Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const DataTable = ({ className = 'react-data-table', datas, columns, paginationOptions, bordered = false, striped = false }) => {
    const [filters, setFilters] = useState({});
    const [filtered, setFiltered] = useState([]);
    const [count, setCount] = useState(paginationOptions && paginationOptions.count ? paginationOptions.count : 5);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageButtons, setPageButtons] = useState([]);
    useEffect(() => {
        setFiltered(datas);
        /* if (paginationOptions) {
            setCount(paginationOptions.count || 5);
        } */
    }, [datas]);
    const setDefaultFilters = useCallback(() => {
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
    useEffect(() => {
        setDefaultFilters();
    }, [setDefaultFilters]);
    const handleFilterChange = (e) => {
        const { target } = e;
        const { name, value } = target;
        setFilters(Object.assign(Object.assign({}, filters), { [name]: value }));
    };
    const getFilter = (col) => {
        const filterType = col.filterType;
        switch (filterType) {
            case 'textFilter': {
                const defaultValue = col.defaultValue || '';
                return (React.createElement("th", { key: col.text },
                    col.text,
                    React.createElement("br", null),
                    React.createElement(Input, { name: col.dataField, type: 'text', placeholder: defaultValue, value: filters[col.dataField], onChange: handleFilterChange })));
            }
            case 'optionFilter': {
                const filterOptions = col.filterOptions || [];
                const defaultValue = col.defaultValue || 'Kérjük válasszon...';
                return (React.createElement("th", { key: col.text },
                    col.text,
                    React.createElement("br", null),
                    React.createElement(Input, { name: col.dataField, type: 'select', onChange: handleFilterChange },
                        React.createElement("option", { key: 'filter_' + filterOptions.id, value: '' }, defaultValue),
                        filterOptions.map((filterOption) => {
                            return React.createElement("option", { key: 'filter_' + filterOption.id, value: filterOption.value }, filterOption.text);
                        }))));
            }
            default: {
                return React.createElement("th", { key: col.text }, col.text);
            }
        }
    };
    const renderHeaderCells = () => {
        const cols = columns || [];
        return (React.createElement("tr", null, cols.map((col) => {
            return !col.hidden && getFilter(col);
        })));
    };
    const getFilterClause = useCallback((key, rowData) => {
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
    const filteringData = useCallback(() => {
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
    const getFirstIndex = useCallback(() => {
        const cP = currentPage;
        const firstIndex = ((cP - 2) < 0) ? 0 : (cP - 2);
        return firstIndex;
    }, [currentPage]);
    const getLastIndex = useCallback(() => {
        const pageCount = pageButtons.length;
        const cP = currentPage;
        const lastIndex = ((cP + 3) > pageCount) ? pageCount : (cP + 3);
        return lastIndex;
    }, [currentPage, pageButtons.length]);
    const createPageButtons = useCallback((filteredData) => {
        const length = filteredData.length;
        const pageCount = Math.ceil(length / count);
        let pageButtonsArray = [];
        for (let i = 0; i < pageCount; i++) {
            pageButtonsArray.push({ key: i, onClick: () => onPageClick(i), text: i + 1 });
        }
        setPageButtons(pageButtonsArray);
    }, [count]);
    const handlePageChange = useCallback((filteredData) => {
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
    useMemo(() => {
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
                return React.createElement("td", { key: 'cell_' + row.id }, col.formatter(col, row));
            }
            else {
                return React.createElement("td", { key: 'cell_' + name + row.id }, row[name]);
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
        return (React.createElement(Table, { className: className, striped: striped ? striped : false, bordered: bordered ? bordered : false },
            React.createElement("thead", null, renderHeaderCells()),
            React.createElement("tbody", null, rows.map((row) => {
                return (React.createElement("tr", { key: 'row_' + row.id }, renderCells(row)));
            }))));
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
        return (React.createElement(Input, { className: 'react-data-table-pagination-rowperpage', style: defaultRowPerPageStyle, type: 'select', value: count, onChange: (e) => { setCount(parseInt(e.target.value, 10)); setCurrentPage(0); } }, rowPerPageOptions && Array.isArray(rowPerPageOptions) && rowPerPageOptions.length > 0 && (rowPerPageOptions.map((opt) => {
            const { value, text } = opt;
            return (React.createElement("option", { key: value, value: value }, text));
        }))));
    };
    const renderPageButtons = (color, nextText, previousText, firstPageText, lastPageText) => {
        const defaultPageButtonsStyle = {
            float: 'right'
        };
        const firstIndex = getFirstIndex();
        const lastIndex = getLastIndex();
        let buttons = [];
        for (let i = firstIndex; i < lastIndex; i++) {
            buttons.push(React.createElement(Button, { color: color, outline: currentPage !== pageButtons[i].key, key: pageButtons[i].key, onClick: pageButtons[i].onClick }, pageButtons[i].text));
        }
        return (React.createElement("div", { className: 'react-data-table-pagination-buttons', style: defaultPageButtonsStyle },
            React.createElement(Button, { outline: true, color: color, hidden: currentPage === 0, onClick: () => onFirstClick() }, firstPageText),
            React.createElement(Button, { outline: true, color: color, hidden: currentPage === 0, onClick: () => onPreviousClick() }, previousText),
            buttons.map((butt) => {
                return butt;
            }),
            React.createElement(Button, { outline: true, color: color, hidden: currentPage === pageButtons.length - 1, onClick: () => onNextClick() }, nextText),
            React.createElement(Button, { outline: true, color: color, hidden: currentPage === pageButtons.length - 1, onClick: () => onLastClick() }, lastPageText)));
    };
    const renderPagination = () => {
        if (paginationOptions && typeof paginationOptions === 'object' && filtered.length > 0) {
            const { color, nextText = '>', previousText = '<', firstPageText = '<<', lastPageText = '>>', rowPerPageOptions } = paginationOptions;
            const defaultPaginationStyle = {
                width: '100%',
                clear: 'both'
            };
            return (React.createElement("div", { className: 'react-data-table-paginator', style: defaultPaginationStyle },
                renderRowPerPage(rowPerPageOptions),
                renderPageButtons(color, nextText, previousText, firstPageText, lastPageText)));
        }
        else {
            return '';
        }
    };
    return (React.createElement(React.Fragment, null,
        renderTable(),
        renderPagination()));
};
export default DataTable;
DataTable.propTypes = {
    className: PropTypes.string,
    datas: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    paginationOptions: PropTypes.shape({
        color: PropTypes.string,
        count: PropTypes.number.isRequired,
        nextText: PropTypes.string,
        previousText: PropTypes.string,
        firstPageText: PropTypes.string,
        lastPageText: PropTypes.string,
        rowPerPageOptions: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired
        }))
    }),
    bordered: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    striped: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};
//# sourceMappingURL=DataTable.js.map