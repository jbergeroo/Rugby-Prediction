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
}));

function App({ userConnected }) {

  
  return <div> App</div>
}

export default App;
