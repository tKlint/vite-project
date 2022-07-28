/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable import/extensions */
import React, { lazy, ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { IRoutes, router } from './routers/router';
import NotFound from './pages/404';
import store from './store/index';
import 'antd/dist/antd.css';
import './index.css';

type RouteResponse = {
    path: string;
    name: string;
    component?: string;
    index?: boolean;
    children?: RouteResponse[];
};

const mockRoutes = (): Promise<RouteResponse[]> => {
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
                    path: 'contact',
                    name: 'contact',
                    children: [
                        {
                            path: 'friendsList',
                            name: 'friendsList',
                            component: '/contacts/FriendsList/index'
                        },
                        {
                            path: 'requestList',
                            name: 'requestList',
                            component: '/contacts/RequestList/index'
                        }
                    ]
                }
            ]);
        }, 2000);
    });
};

interface ModuleElemnet {
    (): Promise<{
        default: React.FC<Record<string, unknown>>;
    }>;
}

const App = (): React.ReactElement | null => {
    const [routes, setRoutes] = useState<IRoutes[]>([]);
    const modules = import.meta.glob('./pages/**/*');
    const modulesMap = new Map<string, string>();

    Object.keys(modules).forEach((key) => {
        // 只支持这4中组件
        const matchedGroup = key.match(/\.(tsx|ts|jsx|js)$/);
        if (matchedGroup !== null) {
            modulesMap.set(key.slice(0, matchedGroup.index), key);
            modulesMap.set(key, key);
        }
    });

    const pollRoutes = (routesList: RouteResponse[], parentPath = ''): IRoutes[] => {
        return routesList.map((route) => {
            const { path, component, name, index, children } = route;
            const pathLinked = parentPath ? `${parentPath}/` : parentPath;
            const routeProps: IRoutes = {
                path,
                name,
                index: index || undefined,
                children: children
                    ? pollRoutes(children, `${pathLinked}${path}`)
                    : undefined
            };
            if (component) {
                const moduleKey = modulesMap.get(`./pages${component}`);
                let Component: ReactNode = <NotFound path={`${parentPath}/${path}`} />;
                if (moduleKey) {
                    const ModuleComponent = lazy<React.FC>(
                        modules[moduleKey] as unknown as ModuleElemnet
                    );
                    Component = <ModuleComponent />;
                }
                routeProps.element = Component;
            }
            return routeProps;
        });
    };
    const fetechRoutes = async () => {
        const serverSideRoutes = await mockRoutes();
        const routerTree = pollRoutes(serverSideRoutes);
        router[0].children = routerTree;
        setRoutes(router);
    };
    useEffect(() => {
        fetechRoutes();
    }, []);

    if (routes.length === 0) {
        // TODO
    }
    return useRoutes(routes) as React.ReactElement;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            {/* <React.Suspense fallback={<div>loading</div>}> */}
            <App />
            {/* <APP /> */}
            {/* </React.Suspense> */}
        </BrowserRouter>
    </Provider>
);
