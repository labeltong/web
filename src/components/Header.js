import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import defaultUserImage from '../static/user.svg';

class Header extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand navbar-light bg-light">
				<Link className="navbar-brand" to="/">
					<b>Label Tong</b>
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				/>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item active">
							<Link className="nav-link" to="/">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/label">
								Label
							</Link>
						</li>

						<li className="nav-item">
							<div className="point">
								<i className="fas fa-coins" />
								{this.props.points}
							</div>
						</li>
						<li className="nav-item">
							<img
								src={defaultUserImage}
								className="profile-img"
								alt="profile"
							/>
						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

Header.defaultProps = { points: 5000 };

export default Header;
