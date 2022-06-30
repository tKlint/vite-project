import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/index';
import 'antd/dist/antd.css';
import './index.css';

import { dispatchRouter, router } from './routers/router';

const routerChilren = dispatchRouter(router);
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>{routerChilren}</Routes>
        </BrowserRouter>
    </Provider>
);
