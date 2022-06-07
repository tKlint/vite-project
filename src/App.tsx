import { useState } from 'react'
import './App.css'
import { Button } from 'antd';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const App: React.FC<{}> = props => {
	const navigate = useNavigate();
    const isLogin = localStorage.getItem('token');

	return isLogin ? (
			<Outlet/>
	) : <Navigate to="/login" />
}

export default App
