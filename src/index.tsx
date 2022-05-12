import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import datas from './datas'
/* import columns from './columns'; */
import DataTable from './DataTable';

const root = createRoot(document.getElementById('root'));

const columns = [
    {
        dataField: 'name',
        text: 'Név',
        filter: true,
        filterType: 'textFilter'
    },
    {
        dataField: 'occupation',
        text: 'Foglalkozás',
        filter: true,
        /* filterType: 'text' */
        filterType: 'optionFilter',
        filterOptions: [
            {
                id: 'frontend developer',
                value: 'frontend developer',
                text: 'frontend developer'
            },
            {
                id: 'backend developer',
                value: 'backend developer',
                text: 'backend developer'
            }
        ]
    },
    {
        dataField: 'id',
        text: 'Műveletek',
        formatter: (cell: any, row: any) => {
            return <React.Fragment><button>{row.id}</button>&nbsp;&nbsp;<button>{row.id}</button>&nbsp;&nbsp;<button>{row.id}</button></React.Fragment>
        }
    }
];

const paginationOptions = {
    color: 'primary', count: 5, nextText: '>', previousText: '<', firstPageText: '<<', lastPageText: '>>', rowPerPageOptions: [
        {
            value: 5,
            text: '5'
        },
        {
            value: 10,
            text: '10'
        },
        {
            value: 25,
            text: '25'
        },
    ]
}
root.render(<DataTable bordered datas={datas} columns={columns} paginationOptions={paginationOptions} />);


export { DataTable }




