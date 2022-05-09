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
        formatter: (cell, row) => {
            return <td key={'cell_id' + row.id}><button>{row.id}</button>&nbsp;&nbsp;<button>{row.id}</button>&nbsp;&nbsp;<button>{row.id}</button></td>
        }
    }
];

export default columns;