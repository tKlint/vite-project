import { LockOutlined, RollbackOutlined } from '@ant-design/icons';
import {
    ProForm,
    ProFormCaptcha,
    ProFormInstance,
    ProFormText
} from '@ant-design/pro-components';
import { Button, Col, Divider, Form, Input, message, Modal, Row } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import API from '../../service/api';

export interface RegisterStatus {
    email: string;
    captcha: string;
    nickName: string;
    password: string;
    confirm: string;
}

const Register: React.FC<Record<string, never>> = () => {
    const navigate = useNavigate();
    const [sendding, setSendding] = useState<boolean>(false);
    const [countDown, setCountDown] = useState<number>(0);
    const form = useRef<ProFormInstance<RegisterStatus>>();
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
    };
    let timer: NodeJS.Timer;
    const startCountDown = () => {
        setCountDown(60);
        let count = 60;
        timer = setInterval(() => {
            setCountDown((state) => state - 1);
            count -= 1;
            if (count === 0) {
                clearInterval(timer);
            }
        }, 1000);
    };

    useEffect(() => {
        return () => {
            clearInterval(timer);
        };
    }, []);

    const sendEmial = async () => {
        setCountDown((state) => state - 1);
        if (!form.current) {
            message.error('程序异常请等待!!!');
            return;
        }
        const { email } = await form.current.validateFields(['email']);
        setSendding(true);
        await API['/USER/SEND_CAPTCHA_POST']({ email });
        setSendding(false);
        startCountDown();
    };

    const submitHandle = async (values: RegisterStatus) => {
        const result = await API['/USER/REGISTER_POST'](values);
        if (result.code !== 200) {
            Modal.confirm({
                title: '注册失败',
                content: (
                    <>
                        <p>{result.message}</p>
                        <p>{result.subMessage}</p>
                    </>
                )
            });
            return Promise.resolve();
        }
        message.success('注册成功🎉🎉🎉');
        navigate('/login');
        return Promise.resolve();
    };

    return (
        <div className="regist-wrap">
            <div className="register-form-container">
                <Divider plain>
                    <span className="grey-text">注册账号</span>
                </Divider>
                <ProForm<RegisterStatus>
                    // className="register-form-container"
                    layout="horizontal"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    labelAlign="right"
                    onFinish={submitHandle}
                    submitter={{
                        render: () => (
                            <Row>
                                <Col span={16} offset={6}>
                                    <Button
                                        style={{ width: '100%' }}
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        注册
                                    </Button>
                                </Col>
                            </Row>
                        )
                    }}
                    formRef={form}
                >
                    <ProFormText
                        name="email"
                        label="E-mail"
                        rules={[
                            { type: 'email', message: '邮箱格式不正确' },
                            { required: true, message: '请输入邮箱' }
                        ]}
                        placeholder="请输入邮箱"
                    />
                    <ProFormCaptcha
                        label="验证码"
                        fieldProps={{
                            prefix: <LockOutlined className="prefixIcon" />
                        }}
                        placeholder="请输入验证码"
                        captchaTextRender={(timing, count) => {
                            if (timing) {
                                return `${count} ${'获取验证码'}`;
                            }
                            return '获取验证码';
                        }}
                        name="captcha"
                        rules={[
                            {
                                required: true,
                                message: '请输入验证码！'
                            }
                        ]}
                        onGetCaptcha={sendEmial}
                    />
                    <ProFormText
                        name="nickName"
                        label="昵称"
                        rules={[{ required: true, message: '请输入昵称' }]}
                    />
                    <ProFormText.Password
                        name="password"
                        label="密码"
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined className="prefixIcon" />
                        }}
                        placeholder="请输入密码！"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码！'
                            }
                        ]}
                    />
                    <ProFormText.Password
                        name="confirm"
                        label="确认密码"
                        placeholder="再次确认密码"
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error('两次输入的密码不一致')
                                    );
                                }
                            }),
                            { required: true, message: '请输入密码' }
                        ]}
                    />
                </ProForm>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        onClick={() => navigate('/login')}
                        icon={<RollbackOutlined />}
                        type="link"
                    >
                        返回登陆
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="page regsiter-page">
            <div className="register-container">
                <Form<RegisterStatus>
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...formItemLayout}
                    onFinish={submitHandle}
                >
                    <Form.Item
                        label="E-mail"
                        name="email"
                        required
                        rules={[
                            { type: 'email', message: '邮箱格式不正确' },
                            { required: true, message: '请输入邮箱' }
                        ]}
                    >
                        <Input placeholder="请输入邮箱" />
                    </Form.Item>
                    <Form.Item
                        label="验证码"
                        required
                        name="captcha"
                        rules={[{ required: true, message: '请输入验证码' }]}
                    >
                        <Row gutter={4}>
                            <Col span={14}>
                                <Form.Item name="captcha" noStyle>
                                    <Input placeholder="请输入验证码" />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <Button
                                    loading={sendding}
                                    style={{
                                        width: '100%',
                                        textAlign: 'center',
                                        paddingLeft: 0,
                                        paddingRight: 0
                                    }}
                                    onClick={sendEmial}
                                    disabled={countDown > 0}
                                >
                                    {countDown > 0
                                        ? `${countDown}s后重新获取`
                                        : '获取验证码'}
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item
                        label="昵称"
                        name="nickName"
                        rules={[{ required: true, message: '请输入昵称' }]}
                    >
                        <Input placeholder="请输入昵称" maxLength={8} />
                    </Form.Item>
                    <Form.Item
                        required
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input type="password" placeholder="请输入密码" maxLength={8} />
                    </Form.Item>
                    <Form.Item
                        required
                        label="再次确认密码"
                        name="confirm"
                        dependencies={['password']}
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error('两次输入的密码不一致')
                                    );
                                }
                            }),
                            { required: true, message: '请输入密码' }
                        ]}
                    >
                        <Input type="password" placeholder="请确认密码" />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
                        <Button
                            htmlType="submit"
                            type="primary"
                            style={{ width: '100%' }}
                        >
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Register;
