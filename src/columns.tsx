import React from "react";

const columns = [
    {
        dataField: 'name',
        text: 'Név',
        filter: true,
        filterType: 'text'
    },
    {
        dataField: 'occupation',
        text: 'Foglalkozás',
        filter: true,
        /* filterType: 'text' */
        filterType: 'option',
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
        formatter: (cell: any, row: { id: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment; }) => {
            return <React.Fragment><button>{row.id}</button>&nbsp;&nbsp;<button>{row.id}</button>&nbsp;&nbsp;<button>{row.id}</button></React.Fragment>
        }
    }
];

export default columns;