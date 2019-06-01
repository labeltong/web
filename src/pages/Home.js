import React, { Component } from 'react';
import Intro from '../components/Intro';
import CardMenuGroup from '../components/CardMenuGroup';
import { getTags } from '../api';
import classImage from '../static/menu_classification.png';
import boundingImage from '../static/menu_bounding.png';
import soundImage from '../static/menu_sound.png';

class Home extends Component {
	state = {
		methodMenus: [
			{
				title: 'Classification',
				link: '/label/class',
				img: classImage,
				description:
					'Classify images! Classify images! Classify  ! Classify images! Classify images! Classify images! Classify images! Classify images! Classify images! Classify images! ',
			},
			{
				title: 'Bounding Box',
				link: '/label/bounding',
				img: boundingImage,
				description:
					'Find object! Find object! Find object! Find object! F object! Find ! Find object! Find object! Find object! Find object! ',
			},
			{
				title: 'Sound Classification',
				link: '/label/audio',
				img: soundImage,
				description:
					'Classify sound! Classify sound! Classify sound! Classify sound! Classify sound! Classify sound! Classify sound! Classify sound! ',
			},
		],
		themeMenus: [],
	};

	componentDidMount() {
		getTags().then(data => {
			this.setState({
				themeMenus: data.map(d => {
					return {
						title: d.TagName,
						link: `/label/tag/${d.TagId}`,
						img: d.TagThumbnail,
						description: d.TagDescription,
					};
				}),
			});
		});
	}

	render() {
		return (
			<div>
				<Intro />
				<CardMenuGroup menus={this.state.methodMenus} />
				<CardMenuGroup menus={this.state.themeMenus} />
			</div>
		);
	}
}

export default Home;
