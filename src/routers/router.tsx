import { lazy } from "react";
import { Route } from "react-router-dom";
import App from "../App";
import Home from "../components/Home";
import Login from "../pages/login";

export interface RouterConfig  {
    caseSensitive?: boolean;
    name: string;
    element?: React.ReactNode | null;
    index?: boolean;
    path?: string;
    free?: boolean;
};

type RoutersConfig = {
    children?: RouterConfig[];
} & RouterConfig;

const LazyHome = lazy(() => import('../pages/login'))

export const router: RoutersConfig[] = [
    {
        path: '/',
        name: 'app',
        element: <Home />,
        children: [
            {
                path: '/', 
                name: 'index', 
                element: <App />,
                index: true
            }, {
                path: '/login',
                name: 'login', 
                element: <Login/>,
                free: true
            }, {
                path: '/async',
                name: 'async', 
                element: <LazyHome />,
                free: true
            }
        ]
    },

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