import React, { Component } from 'react';

import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Footer from './components/Footer';

import Classification from './pages/Classification';
import Bounding from './pages/Bounding';
import AudioClassification from './pages/AudioClassification';

import './App.scss';
import { socialLogin } from './api';

class App extends Component {
	state = {
		user: null,
	};
	render() {
		return (
			<Router>
				<div className="App">
					<Header user={this.state.user} onLogin={this.handleSocialLogin} />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/label/class" component={Classification} />
						<Route exact path="/label/bounding" component={Bounding} />
						<Route exact path="/label/audio" component={AudioClassification} />
						<Redirect to="/" />
					</Switch>
					<Footer />
				</div>
			</Router>
		);
	}

	handleSocialLogin = user => {
		socialLogin(
			user._profile.email,
			user._profile.name,
			user._token.idToken
		).then(user => {
			console.log('logged in', user);
			this.setState({ user: user });
		});
	};
}

export default App;
