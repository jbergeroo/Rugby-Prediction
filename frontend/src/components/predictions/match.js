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

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      display: 'flex',
      'flex-direction' : 'row'
    }
  }));


export default function Match({ userConnected }) {

    const classes = useStyles()

    const [matches, setMatches] = useState([])
    const [equips, setEquips] = useState([])

    useEffect(() => {

        axiosInstance.get("prediction/match").
            then((res) => {
                setMatches(() => res.data)
            }).
            catch((err) => console.log(err))

        axiosInstance.get("prediction/equip").
            then((res) => {
                setEquips(() => res.data)
            }).
            catch((err) => console.log(err))

    }, []);

    const getMatch = (id_a, id_b) => {
        const teamA = equips.filter((equip) => {
            return equip.id === id_a
        })[0]
        const teamB = equips.filter((equip) => {
            return equip.id === id_b
        })[0]

        return teamA ? teamA.name + " vs " + teamB.name : null
    }

    const getPhoto = (id) => {
        const team = equips.filter((equip) => {
            return equip.id === id
        })[0]
        console.log(team)
        return team ? team.logo : null
    }

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
                        Matches of the Tournament
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        All the next matches happening.
                    </Typography>
                </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                    {matches.map((match) => (
                        <Grid item key={match.id} xs={12} sm={6} md={4} >
                            <Card
                                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <div className={classes.root}>
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            // 16:9
                                            width : '49%',
                                            pt: '28.25%',
                                            'margin-right' : '2%',
                                        }}
                                        image={"http://localhost:8000" + getPhoto(match.equip_a)}
                                    />
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            // 16:9
                                            width : '49%',
                                            pt: '28.25%',
                                        }}
                                        image={"http://localhost:8000" + getPhoto(match.equip_b)}
                                    />
                                </div>

                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {getMatch(match.equip_a, match.equip_b)}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="h2">
                                        {new Date(match.date).toDateString()}
                                    </Typography>
                                    <Typography>
                                        {match.state.toUpperCase()}
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