import React, { Component } from 'react';

import iconFacebook from '../static/facebook.png';
import iconInstagram from '../static/instagram.png';
import iconTwitter from '../static/twitter.png';
import iconWeb from '../static/web.png';

const footerIndex = [
	'HOME',
	'ABOUT',
	'CLASSIFICATION',
	'BOUNDING BOX',
	'AUDIO CLASSIFICATION',
	'NATURE / ANIMALS',
	'PLACES / LANDMARK',
	'AUDIO',
];

class Footer extends Component {
	render() {
		return (
			<div className="footer">
				<div className="main">
					<div className="logo">LABELTONG</div>
					<div className="indices">
						{footerIndex.map(index => (
							<p className="index">{index}</p>
						))}
					</div>
				</div>
				<div className="social">
					<img className="icon" src={iconInstagram} alt="instagram" />
					<img className="icon" src={iconFacebook} alt="facebook" />
					<img className="icon" src={iconTwitter} alt="twitter" />
					<img className="icon" src={iconWeb} alt="web" />
				</div>
			</div>
		);
	}
}

export default Footer;
