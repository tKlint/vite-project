import loginConst from '@/const/login';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { LoginStatus, userLogin } from '@/store/login';
import {
    AlipayOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoOutlined,
    UserOutlined,
    WeiboOutlined
} from '@ant-design/icons';
import { LoginFormPage, ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { Button, Divider, message, Modal, Space, Tabs } from 'antd';
import { CSSProperties, useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router';
import { AccountFields } from './components/Account';
import { EmailFields } from './components/Email';

import './index.less';

type LoginType = 'email' | 'account';

const iconStyles: CSSProperties = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer'
};

const activeStyle: CSSProperties = {
    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
    color: '#fff',
    borderRadius: 8,
    backgroundColor: '#1677FF'
};

export type LoginData = (AccountFields | EmailFields) & {
    loginType: string;
};

const Login: React.FC<Record<string, unknown>> = () => {
    const [loginType, setLoginType] = useState<LoginType>('account');
    const dispatch = useAppDispatch();
    const loginState = useAppSelector((state) => state.loginReducer);
    const navigate = useNavigate();
    const {
        updateTimestamp,
        status,
        message: errMessage,
        subMessage,
        accessToken
    } = loginState;
    const {
        backgorundImgUrl,
        logoUrl,
        title,
        subTitle,
        activeTitle,
        activeSubTitle,
        activeActionText
    } = loginConst;

    const storageToken = localStorage.getItem('access-token');
    const isLogin = storageToken || accessToken;
    const watchLoginState = () => {
        if (!updateTimestamp) {
            return;
        }

        switch (status) {
            case LoginStatus.OK:
                localStorage.setItem('access-token', accessToken || '');
                navigate('/', {
                    replace: true
                });
                break;
            case LoginStatus.ERROR:
                Modal.confirm({
                    title: '??????: ????????????',
                    content: (
                        <>
                            <p>{errMessage}</p>
                            <p>{subMessage}</p>
                        </>
                    )
                });
                break;
            default:
                message.warning('???????????????');
                break;
        }
    };

    useEffect(() => {
        watchLoginState();
    }, [updateTimestamp, status]);

    if (isLogin) {
        return <Navigate to="/" />;
    }

    if (!window.location.pathname.endsWith('/login')) {
        return <Outlet />;
    }

    const submit = (form: EmailFields & AccountFields) => {
        dispatch(
            userLogin({
                loginType,
                ...form
            })
        );
        return Promise.resolve();
    };

    const toRegister = () => {
        navigate('./register');
    };

    return (
        <div className="page-login-wrap">
            <LoginFormPage<EmailFields & AccountFields>
                backgroundImageUrl={backgorundImgUrl}
                logo={logoUrl}
                title={title}
                subTitle={subTitle}
                activityConfig={{
                    style: activeStyle,
                    title: activeTitle,
                    subTitle: activeSubTitle,
                    action: (
                        <Button size="large" className="active-btn">
                            {activeActionText}
                        </Button>
                    )
                }}
                actions={
                    <div className="login-form-wrap">
                        <Divider plain>
                            <span className="grey-text">??????????????????</span>
                        </Divider>
                        <Space align="center" size={24}>
                            <div className="anther-login-icon-wrap">
                                <AlipayOutlined
                                    style={{ ...iconStyles, color: '#1677FF' }}
                                />
                            </div>
                            <div className="anther-login-icon-wrap">
                                <TaobaoOutlined
                                    style={{ ...iconStyles, color: '#FF6A10' }}
                                />
                            </div>
                            <div className="anther-login-icon-wrap">
                                <WeiboOutlined
                                    style={{ ...iconStyles, color: '#333333' }}
                                />
                            </div>
                        </Space>
                    </div>
                }
                onFinish={submit}
            >
                <Tabs
                    activeKey={loginType}
                    onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                >
                    <Tabs.TabPane key="account" tab="??????????????????" />
                    <Tabs.TabPane key="email" tab="????????????" />
                </Tabs>
                {loginType === 'account' && (
                    <>
                        <ProFormText
                            name="account"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className="prefixIcon" />
                            }}
                            placeholder="???????????????!"
                            rules={[
                                {
                                    required: true,
                                    message: '???????????????!'
                                }
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className="prefixIcon" />
                            }}
                            placeholder="??????????????????"
                            rules={[
                                {
                                    required: true,
                                    message: '??????????????????'
                                }
                            ]}
                        />
                    </>
                )}
                {loginType === 'email' && (
                    <>
                        <ProFormText
                            fieldProps={{
                                size: 'large',
                                prefix: <MobileOutlined className="prefixIcon" />
                            }}
                            name="email"
                            placeholder="??????"
                            rules={[
                                {
                                    required: true,
                                    message: '??????????????????'
                                },
                                {
                                    type: 'email',
                                    message: '?????????????????????'
                                }
                            ]}
                        />
                        <ProFormCaptcha
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className="prefixIcon" />
                            }}
                            captchaProps={{
                                size: 'large'
                            }}
                            placeholder="??????????????????"
                            captchaTextRender={(timing, count) => {
                                if (timing) {
                                    return `${count} ${'???????????????'}`;
                                }
                                return '???????????????';
                            }}
                            name="captcha"
                            rules={[
                                {
                                    required: true,
                                    message: '?????????????????????'
                                }
                            ]}
                            onGetCaptcha={async () => {
                                message.success('???????????????????????????????????????1234');
                            }}
                        />
                    </>
                )}
                <div className="tooltip-wrap">
                    <Button type="link" onClick={toRegister}>
                        ??????
                    </Button>
                    <Button type="link">????????????</Button>
                </div>
            </LoginFormPage>
        </div>
    );
};

export default Login;
