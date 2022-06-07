import { Col, Menu, MenuProps, Row } from "antd";
import React, { Suspense } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import Loading from "../components/Loding";

import {
    PieChartOutlined,
} from '@ant-design/icons';
import { router, RoutersConfig } from "../routers/router";
import HeaderLayout from "./HeaderLayout";


import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const BasicLayout: React.FC<{}> = props => {
    const isLogin = localStorage.getItem('access-token');
    const navigate = useNavigate();
    type MenuItem = Required<MenuProps>['items'][number];
    function getItem(
        label: React.ReactNode,
        key: React.Key,
        path: string,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: string,
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            path,
            type,
        } as MenuItem;
    }

    const createMenuItemsWithRouter = (router: RoutersConfig[], parentName?: string, pathUrl?: string): MenuItem[] => {
        return router.map(item => {
            // const uniKey = parentName ? `${parentName}.${item.name}` : item.name;
            const currentPath = item.path === '/' ? '/' : `${pathUrl || ''}/${item.path}`;
            return getItem(
                item.name,
                currentPath,
                currentPath,
                <PieChartOutlined />,
                item.children ? createMenuItemsWithRouter(item.children, currentPath, currentPath) : undefined,
            )
        })
    }

    const onClick: MenuProps['onClick'] = e => {
        navigate(e.key);
    };

    return isLogin ? (
        <>
            <Header>
                <HeaderLayout />
            </Header>
            <Layout style={{ minHeight: 'calc(100vh - 64px)', background: 'red' }}>
                <Sider>
                    <Menu
                        onClick={onClick}
                        defaultSelectedKeys={[location.pathname]}
                        mode="inline"
                        theme="light"
                        items={createMenuItemsWithRouter(router[0].children || [])}
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
                        this is a foot
                    </Footer>
                </Layout>
            </Layout>
        </>
    ) : <Navigate to="/login" />
}
export default BasicLayout;