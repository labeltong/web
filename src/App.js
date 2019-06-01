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

import Label from './pages/Label';

import './App.scss';
import { socialLogin, updateUserInfo } from './api';

class App extends Component {
	state = {
		user: null,
	};

	render() {
		return (
			<Router>
				<div className="App">
					<Header
						user={this.state.user}
						onLogin={this.handleSocialLogin}
						onLogout={this.handleLogout}
					/>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route
							exact
							path="/label/tag/:tagID"
							component={() => (
								<Label user={this.state.user} updateUser={this.updateUser} />
							)}
						/>
						<Route
							exact
							path="/label/:method"
							component={() => (
								<Label user={this.state.user} updateUser={this.updateUser} />
							)}
						/>
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
		).then((user, jwt) => {
			console.log('logged in', user);
			this.setState({ user: user }, () => {
				alert('로그인 완료');
			});
		});
	};
	handleLogout = () => {
		this.setState({ user: null }, () => {
			alert('로그아웃 완료');
		});
	};
	updateUser = () => {
		updateUserInfo(this.state.user.jwt).then(user => {
			this.setState({ user });
		});
	};
}

export default App;
