import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes } from "react-router-dom";

import './index.css'
import 'antd/dist/antd.css';

import { dispatchRouter, router } from './routers/router';

const routerChilren = dispatchRouter(router);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes children={routerChilren} />
        </BrowserRouter>
    </React.StrictMode>
)
