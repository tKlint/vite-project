import { Route, RouteObject } from 'react-router-dom';
import SecurityLayout from '@/layout/SecurityLayout';
import Login from '@/pages/login';
import Register from '@/pages/login/register';
import NotFound from '@/pages/404';
import Loading from '../components/Loding';

export interface RouterConfig {
    caseSensitive?: boolean;
    name: string;
    element?: React.ReactNode | null;
    index?: boolean;
    path?: string;
    free?: boolean;
}

export type RoutersConfig = {
    name?: string;
} & RouteObject;

export interface IRoutes extends RouteObject {
    name?: string;
    children?: IRoutes[];
}
export const router: IRoutes[] = [
    {
        path: '/',
        name: 'app',
        element: <SecurityLayout />,
        children: [
            {
                path: '/',
                element: <Loading width={500} height={500} />
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        element: <Login />,
        children: [
            {
                path: 'register',
                name: 'register',
                element: <Register />,
                index: true
            }
        ]
    },
    {
        path: '*',
        element: <NotFound path="/" />
    }
];

export function dispatchRouter(config: RoutersConfig[], parentPath = '') {
    return config.map((item) => {
        const props = {
            ...item,
            children: null
        };

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
}
