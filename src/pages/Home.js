import React, { Component } from 'react';
import Intro from '../components/Intro';
import CardMenuGroup from '../components/CardMenuGroup';
import { MethodMenusData, ThemeMenuData } from '../CardMenuData';

class Home extends Component {
	render() {
		return (
			<div>
				<Intro />
				<CardMenuGroup menus={MethodMenusData} />
				<CardMenuGroup menus={ThemeMenuData} />
			</div>
		);
	}
}

export default Home;
