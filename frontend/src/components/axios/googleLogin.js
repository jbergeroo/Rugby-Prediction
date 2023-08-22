import axios from 'axios';

const ggLogin = (credentials, navigate, onLogIn) => {
    axios
        .post('http://127.0.0.1:8000/auth/convert-token', {
            token: credentials,
            backend: 'google-oauth2',
            grant_type: 'convert_token',
            client_id: 'google_client_id',
            client_secret:
                'google_client_secret',
        })
        .then((res) => {
            localStorage.setItem('access_token', res.data.access_token);
            localStorage.setItem('refresh_token', res.data.refresh_token);
            navigate("/")
            window.location.reload()
        }).
        catch((err) => console.log(err.response.data));
};

export default ggLogin;