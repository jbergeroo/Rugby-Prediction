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
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import {
    Button,
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


export default function Prediction({ userConnected }) {

    const classes = useStyles()

    const [matches, setMatches] = useState([])
    const [equips, setEquips] = useState([])
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

    const handleChange = (event) => {
        let { name, value } = event.target;
        setModal({ ...modal, [name]: value })
    }

    const savePrediction = () => {
        axiosInstance.put("prediction/", {
            id : modal.prediction.id,
            score_a : modal.scoreA,
            score_b : modal.scoreB
        }).
            then((res) => {
                console.log(res)
            }).
            catch((err) => console.log(err))
        updatePredictions()
        unShow()
    }


    const showCurrent = (prediction) => {
        setModal({ show: true, prediction: prediction, scoreA: prediction.score_a, scoreB: prediction.score_b })
    }

    const unShow = () => {
        setModal({ show: false, prediction: null })
    }

    const showPrediction = (prediction) => {
        const match = getMatch(prediction.match)
        if (!match) {
            return null
        }
        const [teamA, teamB] = match
        const scoreA = prediction.score_a
        const scoreB = prediction.score_b
        const text = teamA + ' (' + scoreA + ') vs ' + teamB + ' (' + scoreB + ')'
        return <ListItemButton key={prediction.id} onClick={() => showCurrent(prediction)}>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItemButton>
    }

    const showModal = () => {
        const match = getMatch(modal.prediction.match)
        if (!match) {
            return null
        }
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
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="scoreB">{teamB}</Label>
                        <Input
                            type="text"
                            id="scoreB"
                            name="scoreB"
                            value={modal.scoreB}
                            onChange={handleChange}
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
                        Your predictions
                    </Typography>
                </Container>
            </Box>

            <Container sx={{ py: 8 }} maxWidth="md">
                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >

                    {predictions.map((prediction) => (
                        showPrediction(prediction)
                    ))}
                </List>
            </Container>
            {modal.show ? showModal() : null}
        </main>
    );
}