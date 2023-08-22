import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios/login';

import FacebookLogin from '../axios/facebookLogin';
import FbLogin from 'react-facebook-login';

import { useGoogleLogin } from '@react-oauth/google';
import GoogleLogin from '../axios/googleLogin';

//MaterialUI
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    facebookButton : {
        width : '100%',
        'background-color' : '#4267B2',
        'color' : '#FFFFFF',
        'padding-top' : '10px',
        'padding-bottom' : '10px',
        border : 'none',
        cursor : 'pointer'
    },
}));

export default function SignIn({ onLogIn, userConnected }) {
    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        email: '',
        password: '',
    });

    const [formData, updateFormData] = useState(initialFormData);
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axiosInstance
            .post(`auth/token/`, {
                username: formData.email,
                password: formData.password,
                grant_type: 'password',
                client_secret: 'login_client_secret',
                client_id: 'login_client_id'
            })
            .then((res) => {
                localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('refresh_token', res.data.refresh_token);
                navigate('/');
                onLogIn();
                window.location.reload();
            }).
            catch(() => setError("Email and password don't match"));
    };

    const responseFacebook = (response) => {
        FacebookLogin(response.accessToken, navigate, onLogIn);
    };

    const loginGoogle = useGoogleLogin({
        onSuccess: tokenResponse => {
            GoogleLogin(tokenResponse.access_token, navigate, onLogIn);
        },
    });


    const classes = useStyles();

    if (userConnected) {
        return <div className='App'>
            You are already connected, don't try to access this page!
        </div>
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <div className={classes.paper}>
                <Avatar className={classes.avatar}></Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    {error !== null ? <Alert severity="error" onClose={() => { setError(null) }}>
                        <AlertTitle >Connexion error</AlertTitle>
                        {error}
                    </Alert> : null}

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    <FbLogin
                        appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
                        fields="name,email,picture"
                        callback={responseFacebook}
                        cssClass={classes.facebookButton}
                        textButton="Sign up with Facebook"
                    />

                    <Button
                        onClick={() => loginGoogle()}
                        fullWidth
                        className={classes.submit}
                    >
                        Sign in with Google 🚀{' '}
                    </Button>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}