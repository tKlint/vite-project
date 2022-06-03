import { useState } from 'react'
import './App.css'
import { Button } from 'antd';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const App: React.FC<{}> = props => {
	const navigate = useNavigate();
	console.log(props, 'props')

    const isLogin = localStorage.getItem('token');


	return isLogin ? (
		<div className="App">
			<Outlet/>
			<Button onClick={() => {
				navigate('/login')
			}}>hi react</Button>
			<Button onClick={() => {
				navigate('/async')
			}}>ascync</Button>
		</div>
	) : <Navigate to="/login" />
}

export default App
