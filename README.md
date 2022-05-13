# @inftechsol/react-data-table

## Compatibility

This component use [React v18.1.0](https://www.npmjs.com/package/react "React v18.1.0"), [react-dom v18.1.0](https://www.npmjs.com/package/react-dom "React DOM v18.1.0"), [Bootstrap v5.1.3](https://www.npmjs.com/package/bootstrap "Bootstrap v5.1.3") and [reactstrap v9.0.2](https://www.npmjs.com/package/reactstrap "Reactstrap v9.0.2").

## Installation

npm i @inftechsol/react-data-table

## Basic usage

```jsx
import React from 'react';
import DataTable from '@inftechsol/react-data-table';

const Table = () => {

    const datas = [
        {
            id: 0,
            name: 'John Smith',
            age: 36,
            occupation: 'developer'
        },
        {
            id: 1,
            name: 'Jane Doe',
            age: 25,
            occupation: 'developer'
        },
        {
            id: 2,
            name: 'Patric Smith',
            age: 42,
            occupation: 'HR manager'
        },
        {
            id: 3,
            name: 'Elizabeth Carter',
            age: 25,
            occupation: 'PR manager'
        },
        {
            id: 4,
            name: 'Daniel Peterson',
            age: 33,
            occupation: 'CEO'
        },
        {
            id: 5,
            name: 'Howard Long',
            age: 52,
            occupation: 'IT specialist'
        },
        {
            id: 6,
            name: 'Eva Porter',
            age: 33,
            occupation: 'secretary'
        }
    ];

    const columns = [
        {
            dataField: 'name',
            text: 'Name'
        },
        {
            dataField: 'age',
            text: 'Age'
        },
        {
            dataField: 'occupation',
            text: 'Occupation'
        },
        {
            dataField: 'id',
            text: 'ID'
        }
    ];

    return (
        <DataTable columns={columns} datas={datas} />
    )

}

export default Table;

```

## Properties
    - DataTable properties:
        - datas: Array (required),
        - columns: Array (required) [
            - column properties
                - dataField: string (required),
                - text: string (required),
                - filter: boolean (optional),
                - filterType: 'textFilter' || 'optionFilter' (required if filter is true),
                - filterOptions: Array (required if filter is true) [
                    {
                        - filterOptions properties:
                            - id: string || number
                            - value: string || number
                            - text: string
                    }
                ],
                - formatter: () => void (optional) // returns elements (it goes between <td> and </td>) 
        ]
        - className: string (optional) // default: 'react-data-table',
        - bordered: boolean (optional),
        - striped: boolean (optional),
        - paginationOptions: object {
            paginationOptions properties: 
                - color: string (optional) => bootstrap 5 colors // 'success', 'warning', 'info', 'danger', 'primary', 'secondary', 'dark' // default: 'secondary',
                - count: number (required if paginationOptions passed) ==> row / page number,
                - nextText: string (optional) ==> next page button text // default: '>',
                - previousText: string (optional) ==> previous page button text // default: '<',
                - firstPageText: string (optional) ==> Back to the first page button text // dafault: '<<',
                - lastPageText: string (optional) ==> Go to the last page button text  // default: '>>',
                - rowPerPageOptions: array (required if paginationOptions passed) ==> Select inputoptions to change row per page [
                    {
                        rowPerPageOptions properties: 
                            - value: number,
                            - text: string
                    }
                ]
        }


