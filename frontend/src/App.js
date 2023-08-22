import { useEffect, useState } from 'react';
import axiosInstance from './axios'

import Loading from 'react-loading-components';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import User from './components/user/user'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    'font-weight': 'bold',
    'margin-bottom': '10%'
  },
}));

function App({ userConnected }) {

  const [infos, setInfos] = useState({
    loading: true,
  })

  const updateInfos = (res) => {
    setInfos({ ...infos, loading: false, ...res.data })
  }

  useEffect(() => {
    if (!userConnected) {
      setInfos(() => ({ ...infos, loading: false }))
    }
    else {
      axiosInstance.get("user").
        then((res) => {
          updateInfos(res)
        }).
        catch((err) => console.log(err))
    }
  }, []);

  const loadingPage = () => {
    return <>
      <Typography component="h1" variant="h5" className={classes.title}>
        Loading..
      </Typography>
      <Loading type='spinning_circles' width={100} height={100} fill='#f44242' /></>
  }

  const notConnectedPage = () => {
    return <>
      <Typography component="h1" variant="h5" className={classes.title}>
        You are not connected
      </Typography>
      <Typography component="h5" variant="h5">
        If you wish to connect, click {' '}
        <Link
          color="textPrimary"
          href="#"
          className={classes.link}
          component={NavLink}
          to="/login"
        >
          here
        </Link>
        .
      </Typography>

    </>
  }

  const connectedPage = () => {
    return <>
    <Typography component="h1" variant="h5" className={classes.title}>
        My Profile
      </Typography>
     <User infos={infos} updateInfos={updateInfos}/>
    </>
  }

  const mainPage = () => {
    return <>{userConnected ? connectedPage() : notConnectedPage()}</>
  }

  const classes = useStyles()

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {infos.loading ? loadingPage() : mainPage()}
      </div>

    </Container>
  );
}

export default App;
