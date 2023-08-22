import axios from 'axios';

const facebookLogin = (accesstoken, navigate, onLogIn) => {
	axios
		.post('http://127.0.0.1:8000/auth/convert-token', {
			token: accesstoken,
			backend: 'facebook',
			grant_type: 'convert_token',
			client_id: 'facebook_client_id',
			client_secret:
				'facebook_client_secret',
		})
		.then((res) => {
			localStorage.setItem('access_token', res.data.access_token);
			localStorage.setItem('refresh_token', res.data.refresh_token);
			navigate("/")
			window.location.reload()
		});
};

export default facebookLogin;