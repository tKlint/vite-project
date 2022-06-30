import { Menu, MenuProps, Layout } from 'antd';
import React, { Suspense } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { PieChartOutlined } from '@ant-design/icons';
import Loading from '../components/Loding';

import { router, RoutersConfig } from '../routers/router';
import HeaderLayout from './HeaderLayout';
import FootLayout from './FootLayout';
import menusConfig from '../local/menu.config.json';

const { Header, Footer, Sider, Content } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const BasicLayout: React.FC<Record<string, never>> = () => {
    const navigate = useNavigate();
    /**
     * 获取菜单元素
     * @param label 菜单秒杀
     * @param key 唯一符号
     * @param path 路由地址
     * @param icon 图标
     * @param children 子路由
     * @param type unkonw
     * @returns 菜单元素
     */
    function getItem(
        label: React.ReactNode,
        key: React.Key,
        path: string,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: string
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            path,
            type
        } as MenuItem;
    }

    /**
     * 根据路由配置生成菜单
     * @param routers 路由配置
     * @param parentName 父级路由name
     * @param pathUrl 路由地址
     * @returns {MenuItem[]}
     */
    const createMenuItemsWithRouter = (
        routers: RoutersConfig[],
        parentName?: string,
        pathUrl?: string
    ): MenuItem[] => {
        return routers.map((item) => {
            const currentPath = item.path === '/' ? '/' : `${pathUrl || ''}/${item.path}`;
            const routerItemNameLink = `${parentName}.${item.name}`;
            const menuName = (menusConfig as Record<string, string>)[routerItemNameLink];

            return getItem(
                menuName,
                currentPath,
                currentPath,
                <PieChartOutlined />,
                item.children
                    ? createMenuItemsWithRouter(
                          item.children,
                          routerItemNameLink,
                          currentPath
                      )
                    : undefined
            );
        });
    };

    const onClick: MenuProps['onClick'] = (e) => {
        navigate(e.key);
    };

    return (
        <>
            <Header>
                <HeaderLayout />
            </Header>
            <Layout style={{ minHeight: 'calc(100vh - 64px)', background: 'red' }}>
                <Sider>
                    <Menu
                        onClick={onClick}
                        defaultSelectedKeys={[window.location.pathname]}
                        mode="inline"
                        theme="light"
                        items={createMenuItemsWithRouter(router[0].children || [], 'app')}
                    />
                </Sider>
                <Layout>
                    <Content style={{ padding: 16 }}>
                        <Suspense fallback={<Loading />}>
                            <React.StrictMode>
                                <Outlet />
                            </React.StrictMode>
                        </Suspense>
                    </Content>
                    <Footer>
                        <FootLayout />
                    </Footer>
                </Layout>
            </Layout>
        </>
    );
};
export default BasicLayout;
