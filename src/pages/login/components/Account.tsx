import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { forwardRef, useImperativeHandle } from "react";

export interface AccountFields {
    account: string;
    password: string;
}

export interface IRef {
    getFields: () => AccountFields;
    validateFields: () => Promise<AccountFields>;
}

const Account: React.ForwardRefExoticComponent<React.RefAttributes<IRef>> = forwardRef<IRef, {}>((props, ref) => {
    
    const [form] = Form.useForm<AccountFields>();
    useImperativeHandle(
      ref,
      () => {
        return ({
            getFields(){
                return form.getFieldsValue();
                
            },
            validateFields(){
                return form.validateFields();
            }
        })
      },
    )
    return (
        <Form form={form}>
            <Form.Item 
                name={'account'}
                rules={
                    [
                        { required: true, message: '请输入账号' }
                    ]
                }
            >
                <Input 
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="请输入账号"
                />
            </Form.Item>
            <Form.Item 
                name={'password'}
                rules={
                    [
                        { required: true, message: '请输入密码' }
                    ]
                }
            >
                <Input 
                    prefix={<LockOutlined className="site-form-item-icon" />} 
                    type="password"
                    placeholder="请输入密码"
                />
            </Form.Item>
        </Form>
    )
})

export default Account;