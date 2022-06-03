import { RouterConfig } from "../routers/router";

interface IProps {
    loaction: string;
    routerConfig: RouterConfig;
    children: JSX.Element;
}

const RouterAuth: React.FC<IProps> = props => {
    const { routerConfig, loaction } = props
    const isLogin = localStorage.getItem('access-token');
    const targetRouter = {};
    return <div></div>
}

export default RouterAuth;