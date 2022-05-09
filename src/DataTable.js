import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Table, Input } from 'reactstrap';
import PropTypes from 'prop-types';

const DataTable = ({ datas, columns, bordered = false, striped = false }) => {
    
    const [ filters, setFilters ] = useState({});
    const [ filtered, setFiltered ] = useState([]);

    useEffect(() => {
        setFiltered(datas);
    }, [datas]);

    const setDefaultFilters = useCallback(() => {
        const cols = columns || [];
        let filterObj = {};

        cols.forEach((col) => {
            if (col.filter) {
                if (col.filterType === 'text') {
                    filterObj[col.dataField] = ''
                } else if (col.filterType === 'option') {
                    filterObj[col.dataField] = ''
                }
            }
        });

        setFilters(filterObj);
    }, [columns])

    useEffect(() => {
        setDefaultFilters();
    }, [setDefaultFilters])

    const handleFilterChange = (e) => {
        const { target } = e;
        const { name, value } = target;

        setFilters({
            ...filters,
            [name]: value
        });

    }

    const getFilter = (col) => {
        const filterType = col.filterType;
        
        switch (filterType) {
            case 'text': {
                const defaultValue = col.defaultValue || '';
                return (
                    <th key={col.text}>{col.text}<br />
                        <Input name={col.dataField} type='text' placeholder={defaultValue} value={filters[col.dataField]} onChange={handleFilterChange} />
                    </th>
                );
            }
            case 'option': {
                const filterOptions = col.filterOptions || [];
                const defaultValue = col.defaultValue || 'Kérjük válasszon...';

                return (
                    <th key={col.text}>{col.text}<br />
                        <Input name={col.dataField} type='select' onChange={handleFilterChange}>
                            <option key={'filter_' + filterOptions.id} value=''>{defaultValue}</option>
                            {filterOptions.map((filterOption) => {
                                return <option key={'filter_' + filterOption.id} value={filterOption.value}>{filterOption.text}</option>
                            })}
                        </Input>
                    </th>
                );
            }
            default: {
                return <th key={col.text}>{col.text}</th>;
            }
        }
    }

    const renderHeaderCells = () => {
        const cols = columns || [];
        let cell = '';
        return (
            <tr>
                {cols.map((col) => {
                    if (!col.hidden) {
                        cell = getFilter(col);
                    }
                    return cell;
                })}
            </tr>
        );
    }

    const getFilterClause = useCallback((key, rowData) => {
        const ccc = columns.find((c) => c['dataField'] === key);
        if (ccc.filterType === 'text') {
            return rowData[key].toLowerCase().indexOf(filters[key].toLowerCase()) === -1;
        } 
        if (ccc.filterType === 'option') {
            return rowData[key] !== filters[key];
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
        })
        return newDatas;

    }, [filters, datas, getFilterClause])

    useMemo(() => {
        const filteredData = filteringData();
        setFiltered(filteredData);

    }, [filteringData])
    
    const renderCell = (col, row) => {
        const { formatter, hidden } = col;
        const name = col['dataField'];
        let cell = '';

        if (col && row && !hidden) {
            if (formatter && typeof formatter === 'function') {
                cell = col.formatter(col, row);
            } 
            else {
                cell = <td key={'cell_' + name + row.id}>{row[name]}</td>;
            }
        }

        return cell;
    }
    
    const renderCells = (r) => {
        const row = r || {};
        const cols = columns || [];

        return (
            cols.map((col) => {
                return renderCell(col, row);
            })
        );
    }

    const renderTable = () => {
        const rows = filtered || [];
        return (
            <Table striped={striped ? striped : false} bordered={bordered ? bordered : false}>
                <thead>
                    {renderHeaderCells()}
                </thead>
                <tbody>
                    {rows.map((row, index) => {
                        return (
                            <tr key={'row_' + index.toString()}>
                                {renderCells(row)}
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        );
    }

    return (
        <React.Fragment>
            {renderTable()}
        </React.Fragment>
    );
}

export default DataTable;

DataTable.propTypes = {
    datas: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    bordered: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    striped: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};