import { Button, Col, Form, Input, message, Row, Tabs } from 'antd'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import Loading from '../../components/Loding'
import API from '../../service/api'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { counter, increment } from '../../store/kit'
import { LoginStatus, userLogin } from '../../store/login'
import Account, { AccountFields, IRef as AccountRef } from './components/Account'
import Emial, { EmailFields, IRef as EmailRef } from './components/Email'
import { useNavigate } from "react-router-dom";
import './index.less';

type B<T, K extends keyof T> = {
	[P in K]: T[K]
}
export type LoginData = (AccountFields | EmailFields) & {
	loginType: string;
}


const Login: React.FC<{}> = () => {
	const loginActiveTab = useRef('account');
	const accountForm = useRef<AccountRef>(null);
	const emailForm = useRef<EmailRef>(null);

	const dispatch = useAppDispatch();
	const loginReducer = useAppSelector(state => state.loginReducer);
	const { status, loading, message: msg, subMessage, accessToken } = loginReducer;

	const navigate = useNavigate();
	

	useEffect(() => {
		if (status === LoginStatus.OK) {
			localStorage.setItem('access-token', accessToken || '');
			navigate('/', {
				replace: true
			})
		} else if(status === LoginStatus.ERROR) {
			message.error(`${msg}: ${subMessage}`);
		}
	}, [status])

	const tabChange = (activeKey: string) => {
		loginActiveTab.current = activeKey;
	}

	const submit = async () => {

		console.log(loginActiveTab);
		const { current } = loginActiveTab;

		let formData: AccountFields|EmailFields|undefined;

		if (current === 'account') {
			formData = await accountForm.current?.validateFields();
		} else {
			formData = await emailForm.current?.validateFields();
		}

		if (!formData) {
			return;
		}
		
		dispatch(userLogin(
			{
				loginType: current,
				...formData
			}
		))
	}

	return (
		<div className='user-login-wrap'>
			<Loading style={{
				position: 'absolute',
				width: '100%',
				height: '100%',
				boxSizing: 'border-box',
				overflow: 'hidden',
				left: 0,
				zIndex: -1
			}}/>
			<div className='user-login-container'>
				<Row justify="space-around">
					<Col xl={12} lg={12} md={0}>
						<img src="/asset/Startup_Isometric.png" className='login-img-box' alt=""  />
					</Col>
					<Col xl={12} lg={12} md={20}>
						<div className='login-box'>
							<Tabs 
								defaultActiveKey={loginActiveTab.current} 
								centered
								onChange={tabChange}
							>
								<Tabs.TabPane tab='账号登录' key='account' tabKey='account'>
									<Account ref={accountForm}/>
								</Tabs.TabPane>
								<Tabs.TabPane tab='邮箱登录' key='email' tabKey='email'>
									<Emial />
								</Tabs.TabPane>
							</Tabs>
							<Button loading={loginReducer.loading} onClick={submit}  htmlType='submit' type='primary'>登录</Button>
						</div>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default Login;