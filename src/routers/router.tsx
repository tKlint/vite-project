import { Route, RouteObject } from 'react-router-dom';
import SecurityLayout from '@/layout/SecurityLayout';
import FriendsList from '@/pages/contacts/FriendsList';
import Dashboard from '@/pages/dashboard';
import Login from '@/pages/login';
import Register from '@/pages/login/register';
import RequestList from '@/pages/contacts/RequestList';

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
    name: string;
    children?: IRoutes[];
}
// let i:I;
// i.name
export const router: IRoutes[] = [
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
            },
            {
                path: 'contact',
                name: 'contact',
                children: [
                    {
                        path: 'friendsList',
                        name: 'friendsList',
                        element: <FriendsList />
                    },
                    {
                        path: 'requestList',
                        name: 'requestList',
                        element: <RequestList />
                    }
                ]
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
