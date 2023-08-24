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
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import {
    Button as BT,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from "reactstrap"

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
    const [search, setSearch] = React.useState('');
    const [predictions, setPredictions] = useState([])

    const [modal, setModal] = useState({
        show: false,
        prediction: null
    })

    const updatePredictions = () => {
        axiosInstance.get("prediction/").
            then((res) => {
                setPredictions(() => res.data)
            }).
            catch((err) => console.log(err))
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleChangeSearch = (event) => {
        setSearch(event.target.value)
    }

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

        updatePredictions()

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

    const showMatch = (match, value, search) => {
        const photoA = getPhoto(match.equip_a)
        const photoB = getPhoto(match.equip_b)
        const pool = getPool(match.equip_a)
        const state = match.state
        const teamA = getTeam(match.equip_a)
        const teamB = getTeam(match.equip_b)
        const prediction = predictions.filter((prediction) => {
            return prediction.match === match.id
        })[0]
        const scoreA = prediction ? prediction.score_a : 0
        const scoreB = prediction ? prediction.score_b : 0

        /* Use these values to filter */
        if (value !== 'all') {
            if (value.length === 1) {
                if (value !== pool.toLowerCase()) {
                    return null
                }
            }
            else {
                /* elimination */
                return null
            }
        }

        if (teamA === null || teamB === null) {
            return null
        }

        if (!teamA.toLowerCase().includes(search.toLowerCase()) && !teamB.toLowerCase().includes(search.toLowerCase())) {
            return null
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
                    <Typography>
                        {prediction ? teamA + ' (' + scoreA + ') - ' + teamB + ' (' + scoreB + ')' : "No predictions for now.."}
                    </Typography>
                </CardContent>
                <Button size="small" onClick={() => showCurrent(match.id)}>Predict</Button>
            </Card>
        </Grid>
    }

    const getMatch = (id) => {
        const match = matches.filter((match) => {
            return match.id === id
        })[0]

        if (!match) {
            return null
        }

        const teamA = getTeam(match.equip_a)
        const teamB = getTeam(match.equip_b)

        if (!teamA) {
            return null
        }

        return [teamA, teamB]
    }

    const handleChange3 = (event) => {
        let { name, value } = event.target;
        setModal({ ...modal, [name]: value })
    }

    const savePrediction = () => {
        if (modal.prediction) {
            axiosInstance.put("prediction/", {
                id: modal.prediction.id,
                score_a: modal.scoreA,
                score_b: modal.scoreB
            }).
                then((res) => {
                }).
                catch((err) => console.log(err))
        }
        else {
            axiosInstance.post("prediction/", {
                match: modal.matchID,
                score_a: modal.scoreA,
                score_b: modal.scoreB
            }).
                then((res) => {
                }).
                catch((err) => console.log(err))
        }
        updatePredictions()
        unShow()

    }

    const showModal = () => {
        const match = getMatch(modal.matchID)

        const [teamA, teamB] = match
        return <Modal isOpen={true} toggle={() => unShow()}>
            <ModalHeader toggle={() => unShow()}>Prediction</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="scoreA">{teamA}</Label>
                        <Input
                            type="text"
                            id="scoreA"
                            name="scoreA"
                            value={modal.scoreA}
                            onChange={handleChange3}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="scoreB">{teamB}</Label>
                        <Input
                            type="text"
                            id="scoreB"
                            name="scoreB"
                            value={modal.scoreB}
                            onChange={handleChange3}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button
                    color="success"
                    onClick={() => savePrediction()}
                >
                    Update
                </Button>
            </ModalFooter>
        </Modal>
    }

    const showCurrent = (matchID) => {
        const prediction = predictions.filter((prediction) => {
            return prediction.match === matchID
        })[0]

        const scoreA = prediction ? prediction.score_a : 0
        const scoreB = prediction ? prediction.score_b : 0

        setModal({ show: true, prediction: prediction, scoreA: scoreA, scoreB: scoreB, matchID: matchID })
    }

    const unShow = () => {
        setModal({ show: false, prediction: null })
    }

    const radioButton = () => {
        return <FormControl fullWidth={true} className={classes.formGroup}>
            <TextField id="outlined-basic" label="Team" variant="outlined" value={search} onChange={handleChangeSearch} />
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
                        showMatch(match, value, search)
                    ))}
                </Grid>
                {modal.show ? showModal() : null}
            </Container>
        </main>
    );
}