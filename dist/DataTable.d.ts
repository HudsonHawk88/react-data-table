import { FunctionComponent } from 'react';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
declare const DataTable: ({ className, datas, columns, paginationOptions, bordered, striped }: DataTableProps) => JSX.Element;
export default DataTable;
