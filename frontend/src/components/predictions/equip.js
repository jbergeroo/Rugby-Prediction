import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axios';

import FacebookLogin from '../axios/facebookLogin';
import FbLogin from 'react-facebook-login';

import { useGoogleLogin } from '@react-oauth/google';
import GoogleLogin from '../axios/googleLogin';

//MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function Equip({ userConnected }) {

    const [equips, setEquips] = useState([])

    useEffect(() => {

        axiosInstance.get("prediction/equip").
            then((res) => {
                setEquips(() => res.data)
            }).
            catch((err) => console.log(err))

    }, []);

    if (!userConnected) {
        return <div className='App'>
            You are not connected, don't try to access this page!
        </div>
    }

    return (
        <main>
            <CssBaseline />
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Teams of the Tournament
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Quick summary of all the teams present.
                    </Typography>
                </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                    {equips.map((equip) => (
                        <Grid item key={equip.id} xs={12} sm={6} md={4}>
                            <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                            >
                                <CardMedia
                                    component="div"
                                    sx={{
                                        // 16:9
                                        pt: '56.25%',
                                    }}
                                    image={"http://localhost:8000" + equip.logo}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {equip.name}
                                    </Typography>
                                    <Typography>
                                        Group {' ' + equip.group.toUpperCase()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </main>
    );
}