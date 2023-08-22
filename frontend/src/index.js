import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import App from './App.js';

import Header from './components/header';
import Footer from './components/footer';

import Register from './components/auth/register';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Edit from './components/auth/edit';
import Equip from './components/predictions/equip'
import Match from './components/predictions/match'

import { GoogleOAuthProvider } from '@react-oauth/google';

const Routing = function () {
	const [userConnected, setUserConnected] = useState(localStorage.getItem("access_token") !== null)

	return <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
		<Router>
			<React.StrictMode>
				<Header userConnected={userConnected} onLogOut={() => setUserConnected(false)} />
				<Routes >
					<Route path="/" element={<App/>} />
					<Route path="/register" element={<Register userConnected={userConnected} />} />
					<Route path="/login" element={<Login userConnected={userConnected} onLogIn={() => setUserConnected(true)} />} />
					<Route path="/logout" element={<Logout />} />
					<Route path="/edit" element={<Edit userConnected={userConnected}/>} />
					<Route path="/equip" element={<Equip userConnected={userConnected}/>} />
					<Route path="/match" element={<Match userConnected={userConnected}/>} />
				</Routes >
				<Footer />
			</React.StrictMode>
		</Router>
	</GoogleOAuthProvider>
}

ReactDOM.render(<Routing />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();