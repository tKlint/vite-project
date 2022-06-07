import { MailOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd"
import { forwardRef, useImperativeHandle } from "react";

export interface EmailFields {
    email: string;
    captcha: string;
}

export interface IRef {
    getFields: () => EmailFields;
    validateFields: () => Promise<EmailFields>;
}


const Emial: React.ForwardRefExoticComponent<React.RefAttributes<IRef>> = forwardRef<IRef, {}>((props, ref) => {
    const [form] = Form.useForm<EmailFields>();

    useImperativeHandle(
        ref,
        () => ({
            getFields(){
                return form.getFieldsValue();
                
            },
            validateFields(){
                return form.validateFields();
            }
        })
    )

    return (
        <Form>
            <Form.Item 
                name={'email'}
                rules={[
                    { required: true, message: '请输入邮箱' },
                    { type: 'email', message: '请输入正确的格式' }
                ]}
            >
                <Input
                    prefix={<MailOutlined />}
                    placeholder="请输入邮箱"
                />
            </Form.Item>
            <Form.Item>
                <Row gutter={4}>
                    <Col span={14}>
                        <Form.Item
                            name="captcha"
                            noStyle
                            rules={[{ required: true, message: 'Please input the captcha you got!' }]}
                        >
                            <Input placeholder="请输入验证码"/>
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Button style={{ width: '100%' }}>获取验证码</Button>
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    )
})

export default Emial;