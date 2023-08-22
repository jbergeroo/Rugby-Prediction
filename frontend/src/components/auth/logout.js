import React, { useEffect } from 'react';
import axiosInstance from '../axios/logout';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
	const navigate = useNavigate();

	useEffect(() => {
		const response = axiosInstance.post('auth/revoke-token/', {
			token : localStorage.getItem('refresh_token'),
			client_id : 'logout_client_id',
			client_secret : 'logout_client_secret'
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		axiosInstance.defaults.headers['Authorization'] = null;
		navigate('/login');
	});
	return <div>Logout</div>;
}