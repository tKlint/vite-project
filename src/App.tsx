import { lazy, ReactNode, useEffect, useState } from 'react';
import { Routes, useRoutes } from 'react-router-dom';
import NotFound from './pages/404';
import { IRoutes, router } from './routers/router';
import API from './service/api';
import { RouteResponse } from './service/typing.d';
import { ModuleElemnet } from './typing.d';
import Loading from './components/Loding';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchUser } from './store/user';
import { fetchRoutes } from './store/router';

interface IProps {
    routesObject: IRoutes[];
}

/**
 * 路由中间件
 * @description 让路由的生成发生在当前组件
 * @param props 路由对象
 * @returns
 */
const RouterMiddleware: React.FC<IProps> = (props) => {
    const { routesObject } = props;
    return useRoutes(routesObject);
};

const App = (): React.ReactElement | null => {
    const modules = import.meta.glob('./pages/**/*');
    const user = useAppSelector((state) => state.userReucer);
    const login = useAppSelector((state) => state.loginReducer);
    const routes = useAppSelector((state) => state.routerReducer);

    const dispatch = useAppDispatch();
    const modulesMap = new Map<string, string>();
    const hasToken = localStorage.getItem('access-token');
    /**
     * 映射modules的key和path
     * @description 不区分组件后缀, 根据路径做映射
     */
    const mapModuleKeyWithPath = () => {
        Object.keys(modules).forEach((key) => {
            // 只支持这4种组件
            const matchedGroup = key.match(/\.(tsx|ts|jsx|js)$/);
            if (matchedGroup !== null) {
                modulesMap.set(key.slice(0, matchedGroup.index), key);
                modulesMap.set(key, key);
            }
        });
    };

    /**
     * 递归生产router tree
     * @param routesChildren 子路由集合
     * @param parentPath 父级路由pathname
     * @returns
     */
    const pollCreatRoutes = (
        routesChildren: RouteResponse[],
        parentPath = ''
    ): IRoutes[] => {
        return routesChildren.map((route) => {
            const { path, component, name, index, children } = route;
            const pathLinked = parentPath ? `${parentPath}/` : parentPath;
            const routeProps: IRoutes = {
                path,
                name,
                index: index || undefined,
                children: children
                    ? pollCreatRoutes(children, `${pathLinked}${path}`)
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
    useEffect(() => {
        if (login.accessToken || hasToken) {
            dispatch(fetchUser());
        }
    }, [login.accessToken]);

    useEffect(() => {
        if (user.uuid) {
            dispatch(fetchRoutes());
        }
    }, [user.uuid]);

    if (routes.routes.length === 0) {
        return <div>{useRoutes(router)}</div>;
    }
    mapModuleKeyWithPath();

    router[0].children = pollCreatRoutes(routes.routes);

    return (
        <div>
            <RouterMiddleware routesObject={router} />
        </div>
    );
};

export default App;
