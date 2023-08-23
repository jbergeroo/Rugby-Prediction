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

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2),
        display: 'flex',
        'flex-direction': 'row'
    },
    formGroup: {
        alignItems: 'center'
    }
}));


export default function Match({ userConnected }) {

    const classes = useStyles()

    const [value, setValue] = React.useState('all');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

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

    const getTeam = (id) => {
        const team = equips.filter((equip) => {
            return equip.id === id
        })[0]

        return team ? team.name : null
    }

    const getPhoto = (id) => {
        const team = equips.filter((equip) => {
            return equip.id === id
        })[0]

        return team ? team.logo : null
    }

    const getPool = (id) => {
        const team = equips.filter((equip) => {
            return equip.id === id
        })[0]

        return team ? team.group.toUpperCase() : null
    }

    const showMatch = (match) => {
        const photoA = getPhoto(match.equip_a)
        const photoB = getPhoto(match.equip_b)
        const pool = getPool(match.equip_a)
        const state = match.state
        const teamA = getTeam(match.equip_a)
        const teamB = getTeam(match.equip_b)

        /* Use these values to filter */
        if (value !== 'all') {
            if (value.length === 1 ) {
                if (value !== pool.toLowerCase()) {
                    return null
                }
            }
            else {
                /* elimination */
                return null
            }
        }

        return <Grid item key={match.id} xs={12} sm={6} md={4} >
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className={classes.root}>
                    <CardMedia
                        component="div"
                        sx={{
                            // 16:9
                            width: '49%',
                            pt: '28.25%',
                            'margin-right': '2%',
                        }}
                        image={"http://localhost:8000" + photoA}
                    />
                    <CardMedia
                        component="div"
                        sx={{
                            // 16:9
                            width: '49%',
                            pt: '28.25%',
                        }}
                        image={"http://localhost:8000" + photoB}
                    />
                </div>

                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {teamA + " vs " + teamB}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                        {new Date(match.date).toDateString()}
                    </Typography>
                    <Typography>
                        {state.toUpperCase()}
                    </Typography>
                    {match.state === 'Group match' ? <Typography>
                        {'GROUP ' + pool}
                    </Typography> : null}
                </CardContent>
            </Card>
        </Grid>
    }

    const radioButton = () => {
        return <FormControl fullWidth={true} className={classes.formGroup}>
            <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                row
                value={value}
                onChange={handleChange}
            >
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel value="a" control={<Radio />} label="Group A" />
                <FormControlLabel value="b" control={<Radio />} label="Group B" />
                <FormControlLabel value="c" control={<Radio />} label="Group C" />
                <FormControlLabel value="d" control={<Radio />} label="Group D" />
                <FormControlLabel value="elimination" control={<Radio />} label="Elimination" />
            </RadioGroup>
        </FormControl>
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
                {radioButton()}
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
                <Grid container spacing={4}>
                    {matches.map((match) => (
                        showMatch(match, value)
                    ))}
                </Grid>
            </Container>
        </main>
    );
}