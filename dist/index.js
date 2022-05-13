"use strict";
/* import React from 'react';
import { createRoot } from 'react-dom/client'; */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
/* import datas from './datas'
import columns from './columns'; */
require("./index.css");
require("bootstrap/dist/css/bootstrap.min.css");
/* const rootDiv: any = document.getElementById('root');

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
__exportStar(require("./DataTable"), exports);
//# sourceMappingURL=index.js.map