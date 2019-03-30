import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';

import './App.css';

class App extends Component {
	render() {
		return (
			<Router>
				<div className="App">
					<Header />
					<Switch>
						<Route exact path="/" component={Home} />
						<Route component={Home} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
