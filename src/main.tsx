import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes } from "react-router-dom";
import store from './store';
import { Provider } from 'react-redux'

import './index.css'
import 'antd/dist/antd.css';

import { dispatchRouter, router } from './routers/router';

const routerChilren = dispatchRouter(router);
ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <Routes children={routerChilren} />
        </BrowserRouter>
    </Provider>
    // </React.StrictMode>
)
