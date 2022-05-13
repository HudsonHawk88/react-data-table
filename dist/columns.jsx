"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
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
        formatter: (_cell, row) => {
            return <react_1.default.Fragment><button>{row.id}</button>&nbsp;&nbsp;<button>{row.id}</button>&nbsp;&nbsp;<button>{row.id}</button></react_1.default.Fragment>;
        }
    }
];
exports.default = columns;
