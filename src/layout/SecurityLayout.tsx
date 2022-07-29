import { Navigate } from 'react-router';
import { useAppSelector } from '../store/hooks';
import BasicLayout from './BasicLayout';

/**
 * 安全布局
 * @description 根据登录状态控制用户访问页面
 * @returns
 */
const SecurityLayout: React.FC<Record<string, unknown>> = () => {
    const storageToken = localStorage.getItem('access-token');
    const { accessToken } = useAppSelector((state) => state.loginReducer);
    const isLogin = storageToken || accessToken;
    return isLogin ? <BasicLayout /> : <Navigate to="/login" />;
};
export default SecurityLayout;
