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

import './App.scss';

class App extends Component {
	state = {
		user: { points: 0 },
	};

	render() {
		return (
			<Router>
				<div className="App">
					<Header user={this.state.user} />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/label/class" component={Classification} />
						<Route exact path="/label/bounding" component={Bounding} />
						<Redirect to="/" />
					</Switch>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
