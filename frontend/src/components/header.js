import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    toolbarTitle: {
        flexGrow: 1
    },
    toolBarEmpty: {
        flexGrow: 10
    }

}));

function Header({ userConnected, onLogOut }) {
    const classes = useStyles();

    const loginandRegister = () => {
        return <>
            <nav>
                <Link
                    color="textPrimary"
                    href="#"
                    className={classes.link}
                    component={NavLink}
                    to="/register"
                >
                    Register
                </Link>
            </nav>
            <Button
                href="#"
                color="primary"
                variant="outlined"
                className={classes.link}
                component={NavLink}
                to="/login"
            >
                Login
            </Button>
        </>
    }

    const logout = () => {
        return <>
            <nav>
                <Link
                    color="textPrimary"
                    href="#"
                    className={classes.link}
                    component={NavLink}
                    to="/edit"
                >
                    Edit
                </Link>
            </nav><Button
                href="#"
                color="primary"
                variant="outlined"
                className={classes.link}
                component={NavLink}
                to="/logout"
                onClick={onLogOut}
            >
                Logout
            </Button>
        </>
    }

    const navBar = () => {
        return <React.Fragment>
            {userConnected ? logout() : loginandRegister()}
        </React.Fragment>
    }

    const menu = (value) => {
        return <React.Fragment>
        <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
        >
            <Link
                component={NavLink}
                to="/"
                underline="none"
                color="textPrimary"
            >
                Home
            </Link>
        </Typography>
        <Typography
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
        >
            <Link
                component={NavLink}
                to="/equip"
                underline="none"
                color="textPrimary"
            >
                Equips
            </Link>
        </Typography>
        <Typography
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
        >
            <Link
                component={NavLink}
                to="/match"
                underline="none"
                color="textPrimary"
            >
                Matches
            </Link>
        </Typography>
        <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolBarEmpty}
        >
        </Typography>

    </React.Fragment>
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position="static"
                color="default"
                elevation={0}
                className={classes.appBar}
            >
                <Toolbar className={classes.toolbar}>

                    {menu(userConnected)}

                    {navBar()}

                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default Header;