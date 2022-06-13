import { lazy } from "react";
import { Route } from "react-router-dom";
import App from "../App";
import BasicLayout from "../layout/BasicLayout";
import SecurityLayout from "../layout/SecurityLayout";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";

export interface RouterConfig  {
    caseSensitive?: boolean;
    name: string;
    element?: React.ReactNode | null;
    index?: boolean;
    path?: string;
    free?: boolean;
};

export type RoutersConfig = {
    children?: RoutersConfig[];
} & RouterConfig;

const LazyHome = lazy(() => import('../pages/login'))

export const router: RoutersConfig[] = [
    {
        path: '/',
        name: 'app',
        element: <SecurityLayout />,
        children: [
            {
                path: '/', 
                name: 'dashboard', 
                element: <Dashboard />,
                index: true
            }, {
                path: 'login2',
                name: 'login2', 
                element: <Login/>,
                free: true,
                children: [
                   {
                        path: 'async2',
                        name: 'async2', 
                        element: <Login />,
                        free: true
                    }
                ]
            }, {
                path: '/async',
                name: 'async', 
                element: <Login />,
                free: true
            }
        ]
    }, {
        path: '/login',
        name: 'login',
        element: <Login />,
    }

]

export function dispatchRouter(config: RoutersConfig[], parentPath = '') {
    return config.map(item => {

        let props = {
            ...item,
            children: null,
        };
      
        if (parentPath) {
            props.path = `${parentPath}${item.path}`;
        }

        return <Route {...props} key={props.path}>
            { item.children && dispatchRouter(item.children, props.path) }
        </Route>
    })
}