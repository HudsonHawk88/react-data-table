import React from "react";
declare const columns: ({
    dataField: string;
    text: string;
    filter: boolean;
    filterType: string;
    filterOptions?: undefined;
    formatter?: undefined;
} | {
    dataField: string;
    text: string;
    filter: boolean;
    filterType: string;
    filterOptions: {
        id: string;
        value: string;
        text: string;
    }[];
    formatter?: undefined;
} | {
    dataField: string;
    text: string;
    formatter: (_cell: any, row: {
        id: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment;
    }) => JSX.Element;
    filter?: undefined;
    filterType?: undefined;
    filterOptions?: undefined;
})[];
export default columns;
