import React, { useState, useMemo, useEffect, useCallback, CSSProperties, FunctionComponent } from 'react';
import { Table, Input, Button } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.css';

interface Datas {
    length: number;
    map(arg0: (row: any, index: any) => JSX.Element): React.ReactNode;
}

interface FilterOptions {
    id: number | string;
    value: number | string;
    text: string;
}

interface Columns {
    dataField: string;
    text: string;
    filter?: boolean;
    filterType?: string;
    filterOptions?: FilterOptions[];
    formatter?: FunctionComponent;
    hidden?: boolean;
}

interface RowPerPageOptions {
    value: number;
    text: string;
}

interface PaginationOptions {
    color?: any;
    count: number;
    nextText?: string;
    previousText?: string;
    firstPageText?: string;
    lastPageText?: string;
    rowPerPageOptions?: RowPerPageOptions[];
}

interface DataTableProps {
    className?: string;
    datas: Array<object>;
    columns: Columns[];
    paginationOptions?: PaginationOptions;
    bordered?: boolean;
    striped?: boolean;
}

type PageButtons = any;

type Filters = object | any;

export const DataTable = ({ className = 'react-data-table', datas, columns, paginationOptions, bordered = false, striped = false }: DataTableProps) => {
    const [filters, setFilters] = useState<Filters>({});
    const [filtered, setFiltered] = useState<Datas>([]);
    const [count, setCount] = useState(paginationOptions && paginationOptions.count ? paginationOptions.count : 5);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageButtons, setPageButtons] = useState<PageButtons>([]);

    useEffect(() => {
        setFiltered(datas);
        /* if (paginationOptions) {
            setCount(paginationOptions.count || 5);
        } */
    }, [datas]);

    const setDefaultFilters = useCallback(() => {
        const cols = columns || [];

        let filterObj: object = {};

        cols.forEach((col) => {
            if (col.filter) {
                if (col.filterType === 'textFilter') {
                    Object.assign(filterObj, { [col.dataField]: '' });
                } else if (col.filterType === 'optionFilter') {
                    Object.assign(filterObj, { [col.dataField]: '' });
                }
            }
        });
        setFilters(filterObj);
    }, [columns]);

    useEffect(() => {
        setDefaultFilters();
    }, [setDefaultFilters]);

    useEffect(() => {
        if (filtered.length % count === 0 && filtered.length !== count && currentPage > 0) {
            setCurrentPage((prevState) => prevState - 1);
        }
    }, [filtered.length, count, currentPage]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = e;
        const { name, value } = target;

        setFilters({
            ...filters,
            [name]: value
        });
    };

    const getFilter = (col: any) => {
        const filterType = col.filterType;

        switch (filterType) {
            case 'textFilter': {
                const defaultValue = col.filterDefaultValue || '';
                return (
                    <th key={col.text}>
                        {col.text}
                        <br />
                        <Input name={col.dataField} type="text" placeholder={defaultValue} value={filters[col.dataField]} onChange={handleFilterChange} />
                    </th>
                );
            }
            case 'optionFilter': {
                const filterOptions = col.filterOptions || [];
                const defaultValue = col.filterDefaultValue || 'Kérjük válasszon...';

                return (
                    <th key={col.text}>
                        {col.text}
                        <br />
                        <Input name={col.dataField} type="select" onChange={handleFilterChange}>
                            <option key={'filter_default_' + col.dataField} value="">
                                {defaultValue}
                            </option>
                            {filterOptions.map((filterOption: any) => {
                                return (
                                    <option key={'filter_' + filterOption.id} value={filterOption.value}>
                                        {filterOption.text}
                                    </option>
                                );
                            })}
                        </Input>
                    </th>
                );
            }
            default: {
                return <th key={col.text}>{col.text}</th>;
            }
        }
    };

    const renderHeaderCells = () => {
        const cols = columns || [];

        return (
            <tr>
                {cols.map((col) => {
                    return !col.hidden && getFilter(col);
                })}
            </tr>
        );
    };

    const getFilterClause = useCallback(
        (key: any, rowData: any) => {
            const adat = rowData[key] + '';
            const filt = filters[key] + '';
            const ccc = columns.find((c) => c['dataField'] === key);
            if (ccc && ccc.filterType === 'textFilter') {
                return adat.toLowerCase().indexOf(filt.toLowerCase()) === -1;
            }
            if (ccc && ccc.filterType === 'optionFilter') {
                return adat !== filt;
            } else {
                return undefined;
            }
        },
        [columns, filters]
    );

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
        const firstIndex = cP - 2 < 0 ? 0 : cP - 2;
        return firstIndex;
    }, [currentPage]);

    const getLastIndex = useCallback(() => {
        const pageCount = pageButtons.length;
        const cP = currentPage;
        const lastIndex = cP + 3 > pageCount ? pageCount : cP + 3;
        return lastIndex;
    }, [currentPage, pageButtons.length]);

    const createPageButtons = useCallback(
        (filteredData: Array<object>) => {
            const length = filteredData.length;
            const pageCount = Math.ceil(length / count);
            let pageButtonsArray: Array<object> = [];
            for (let i = 0; i < pageCount; i++) {
                pageButtonsArray.push({ key: i, onClick: () => onPageClick(i), text: i + 1 });
            }

            setPageButtons(pageButtonsArray);
        },
        [count]
    );

    const handlePageChange = useCallback(
        (filteredData: any) => {
            const firstIndex = count * currentPage;
            const lastIndex = firstIndex + count;
            let filteredArray = [];

            for (let i = firstIndex; i < lastIndex; i++) {
                if (filteredData[i]) {
                    filteredArray.push(filteredData[i]);
                }
            }

            setFiltered(filteredArray);
        },
        [count, currentPage]
    );

    useMemo(() => {
        const filteredData = filteringData();
        handlePageChange(filteredData);
        createPageButtons(filteredData);
    }, [filteringData, handlePageChange, createPageButtons]);

    const renderCell = (col: any, row: any, index: any) => {
        const { formatter, hidden } = col;
        const name = col['dataField'];
        let cell = '';

        if (col && row && !hidden) {
            if (formatter && typeof formatter === 'function') {
                return <td key={'cell_' + name + '_' + index + '_' + row.id}>{col.formatter(col, row)}</td>;
            } else {
                return <td key={'cell_' + name + '_' + index + '_' + row.id}>{row[name]}</td>;
            }
        }

        return cell;
    };

    const renderCells = (r: any) => {
        const row = r || {};
        const cols = columns || [];

        return cols.map((col, index) => {
            return renderCell(col, row, index);
        });
    };

    const renderTable = () => {
        const rows: any[] | Datas = filtered || [];
        return (
            <Table className={className} striped={striped ? striped : false} bordered={bordered ? bordered : false}>
                <thead>{renderHeaderCells()}</thead>
                <tbody>
                    {rows.map((row: any, index: any) => {
                        return <tr key={'row_' + index + '_' + row.id}>{renderCells(row)}</tr>;
                    })}
                </tbody>
            </Table>
        );
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

    const onPageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const renderRowPerPage = (rowPerPageOptions: any) => {
        const defaultRowPerPageStyle: CSSProperties = {
            width: 'fit-content',
            float: 'left'
        };

        return (
            <Input
                className="react-data-table-pagination-rowperpage"
                style={defaultRowPerPageStyle}
                type="select"
                value={count}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setCount(parseInt(e.target.value, 10));
                    setCurrentPage(0);
                }}
            >
                {rowPerPageOptions &&
                    Array.isArray(rowPerPageOptions) &&
                    rowPerPageOptions.length > 0 &&
                    rowPerPageOptions.map((opt) => {
                        const { value, text } = opt;
                        return (
                            <option key={value} value={value}>
                                {text}
                            </option>
                        );
                    })}
            </Input>
        );
    };

    const renderPageButtons = (color: string, nextText: string, previousText: string, firstPageText: string, lastPageText: string) => {
        const defaultPageButtonsStyle: CSSProperties = {
            float: 'right'
        };
        const firstIndex = getFirstIndex();
        const lastIndex = getLastIndex();
        let buttons = [];
        for (let i = firstIndex; i < lastIndex; i++) {
            buttons.push(
                <Button color={color} outline={currentPage !== pageButtons[i].key} key={pageButtons[i].key} onClick={pageButtons[i].onClick}>
                    {pageButtons[i].text}
                </Button>
            );
        }

        return (
            <div className="react-data-table-pagination-buttons" style={defaultPageButtonsStyle}>
                <Button outline color={color} hidden={currentPage === 0} onClick={() => onFirstClick()}>
                    {firstPageText}
                </Button>
                <Button outline color={color} hidden={currentPage === 0} onClick={() => onPreviousClick()}>
                    {previousText}
                </Button>

                {buttons.map((butt) => {
                    return butt;
                })}
                <Button outline color={color} hidden={currentPage === pageButtons.length - 1} onClick={() => onNextClick()}>
                    {nextText}
                </Button>
                <Button outline color={color} hidden={currentPage === pageButtons.length - 1} onClick={() => onLastClick()}>
                    {lastPageText}
                </Button>
            </div>
        );
    };

    const renderPagination = () => {
        if (paginationOptions && typeof paginationOptions === 'object' && filtered.length > 0) {
            const { color, nextText = '>', previousText = '<', firstPageText = '<<', lastPageText = '>>', rowPerPageOptions } = paginationOptions;

            const defaultPaginationStyle: CSSProperties = {
                width: '100%',
                clear: 'both'
            };

            return (
                <div className="react-data-table-paginator" style={defaultPaginationStyle}>
                    {renderRowPerPage(rowPerPageOptions)}
                    {renderPageButtons(color, nextText, previousText, firstPageText, lastPageText)}
                </div>
            );
        } else {
            return '';
        }
    };

    return (
        <React.Fragment>
            {renderTable()}
            {renderPagination()}
        </React.Fragment>
    );
};
