/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/extensions */
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/index';
import 'antd/dist/antd.css';
import './index.css';

import { dispatchRouter, router } from './routers/router';
import Login from './pages/login';
import Register from './pages/login/register';
import SecurityLayout from './layout/SecurityLayout';
import { useAppDispatch } from './store/hooks';

// const routerChilren = dispatchRouter(router);
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
// ReactDOM.createRoot(document.getElementById('root')!).render(
//     <Provider store={store}>
//         <BrowserRouter>
//             <Routes>{routerChilren}</Routes>
//         </BrowserRouter>
//     </Provider>
// );

const mockRoutes = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    path: '/',
                    name: 'dashboard',
                    component: '/dashboard/index',
                    index: true
                },
                {
                    path: '/requestList',
                    name: 'dashboard1',
                    component: '/dashboard/index',
                    // index: true
                }
            ]);
        }, 3000);
    });
};

const App = () => {
    const [routes, setRoutes] = useState<JSX.Element[]>([]);
    const [loading, setLoading] = useState(true);
    const modules = import.meta.glob('@/pages/*/*');
    const pollRoutes = (items: any[], parentPath = '') => {
        return items.map((item) => {
            const props = {
                ...item,
                children: null
                // element: null
            };
            if (item.component) {
                const Component = modules[`@/pages${item.component}`];
                // if your project use webpack
                // const Component = lazy(() => import('@/pages/dashboard/index'));
                props.element = Component;
            }
            if (parentPath) {
                props.path = `${parentPath}${item.path}`;
            }

            return (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <Route {...props} key={props.path}>
                    {item.children && dispatchRouter(item.children, props.path)}
                </Route>
            );
        });
    };
    const dispatch = useAppDispatch();
    const fetechRoutes = async () => {
        const serverSideRoutes = (await mockRoutes()) as any[];
        const routerTree = pollRoutes(serverSideRoutes);
        setRoutes(routerTree);
        // @ts-ignore
        window.routerTree = routerTree;
        setLoading(false);
    };
    useEffect(() => {
        fetechRoutes();
    }, []);
    if (loading) {
        return <div>加载中....</div>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SecurityLayout />}>
                    {routes}
                    <Route path="*" element={<div>405</div>} />
                </Route>
                <Route path="/login" element={<Login />}>
                    <Route path="/login/register" element={<Register />} />
                </Route>
                <Route path="*" element={<div>404</div>} />
            </Routes>
        </BrowserRouter>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>
);
