import { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
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
export declare const DataTable: {
    ({ className, datas, columns, paginationOptions, bordered, striped }: DataTableProps): JSX.Element;
    propTypes: {
        className: PropTypes.Requireable<string>;
        datas: PropTypes.Validator<any[]>;
        columns: PropTypes.Validator<any[]>;
        paginationOptions: PropTypes.Requireable<PropTypes.InferProps<{
            color: PropTypes.Requireable<string>;
            count: PropTypes.Validator<number>;
            nextText: PropTypes.Requireable<string>;
            previousText: PropTypes.Requireable<string>;
            firstPageText: PropTypes.Requireable<string>;
            lastPageText: PropTypes.Requireable<string>;
            rowPerPageOptions: PropTypes.Requireable<PropTypes.InferProps<{
                value: PropTypes.Validator<number>;
                text: PropTypes.Validator<string>;
            }>[]>;
        }>>;
        bordered: PropTypes.Requireable<string | boolean>;
        striped: PropTypes.Requireable<string | boolean>;
    };
};
export {};
