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

import './App.scss';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Header />
					<Switch>
						<Route exact path="/" component={Home} />
						<Redirect to="/" />
					</Switch>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
