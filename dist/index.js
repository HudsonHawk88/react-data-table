"use strict";
/* import React from 'react';
import { createRoot } from 'react-dom/client'; */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DataTable_1 = __importDefault(require("./DataTable"));
/* import datas from './datas'
import columns from './columns';



const rootDiv: any = document.getElementById('root');

const root = createRoot(rootDiv);


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

root.render(<DataTable bordered datas={datas} columns={columns} paginationOptions={paginationOptions} />); */
exports.default = DataTable_1.default;
//# sourceMappingURL=index.js.map