import React, { useState } from 'react';
import axiosInstance from '../../axios'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alert: {
        margin: theme.spacing(0, 0, 2),
    }
}));

export default function User({ infos, updateInfos }) {

    const [errorMsg, setErrorMsg] = useState(null)
    const [successMsg, setSuccessMsg] = useState(null)

    const initialFormData = Object.freeze({
        email: infos.email,
        username: infos.username,
        first_name: infos.first_name,
        start_date: infos.start_date,
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleSubmit = (event) => {
        event.preventDefault()
        axiosInstance
            .put(`user/`, formData
            )
            .then((res) => {
                console.log(res)
                const success = Object.entries(res.data)
                setSuccessMsg(success);
            }).
            catch((err) => {
                console.log(err.response.data)
                const error = Object.entries(err.response.data)
                setErrorMsg(error);
            });
    }

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const classes = useStyles()

    return <>
        <form className={classes.form} noValidate>
        {errorMsg ? errorMsg.map(k => {
                return <Alert severity="error" className={classes.alert} key={k[0] + "alert"} onClose={() => { setErrorMsg(errorMsg.filter(key => k[0] !== key[0])) }}>
                    <AlertTitle key={k[0] + "alertTitle"}>{k[0]} error</AlertTitle>
                    {k[1][0]}
                </Alert>
            }) : null}
            {successMsg ? successMsg.map(k => {
                return <Alert severity="success" className={classes.alert} key={k[0] + "alert"} onClose={() => { setSuccessMsg(successMsg.filter(key => k[0] !== key[0])) }}>
                    <AlertTitle key={k[0] + "alertTitle"}>{k[0]} update</AlertTitle>
                    {k[0] + ' has been successfully updated.'}
                </Alert>
            }) : null}
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
                defaultValue={formData.email}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="first_name"
                label="First Name"
                name="first_name"
                autoComplete="first_name"
                autoFocus
                onChange={handleChange}
                defaultValue={formData.first_name}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={handleChange}
                defaultValue={formData.username}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="start_date"
                label="Start date"
                id="start_date"
                autoComplete="start_date"
                InputProps={{ readOnly: true, }}
                defaultValue={new Date(formData.start_date).toLocaleDateString()}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
            >
                Edit my profile
            </Button>
        </form></>;
}