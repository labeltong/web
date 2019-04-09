import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FacebookButton, GoogleButton } from './SocialButton';

class Header extends Component {
	render() {
		return (
			<nav className="navbar navbar-expand navbar-light">
				<Link className="navbar-brand" to="/">
					<b>Label Tong</b>
				</Link>
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
						{this.props.user ? (
							<UserMenu user={this.props.user} />
						) : (
							<LoginMenu />
						)}
					</ul>
				</div>
			</nav>
		);
	}
}

const UserMenu = ({ user }) => {
	return (
		<div className="user-menu">
			<i className="fas fa-coins" />
			{user.points}
			<button className="btn">
				<i className="fas fa-user" />
			</button>
			<div className="dropdown">
				<button className="btn">
					<i className="fas fa-sign-out-alt" /> Logout
				</button>
			</div>
		</div>
	);
};

class LoginMenu extends Component {
	state = { show: false };

	render() {
		return (
			<div className="login-menu">
				<button
					className="btn"
					onClick={() => {
						this.setState({ show: true });
					}}
					onBlur={() => {
						this.setState({ show: false });
					}}
				>
					<i className="fas fa-sign-in-alt" />
				</button>
				{this.state.show && (
					<div className="dropdown">
						<FacebookButton />
						<GoogleButton />
					</div>
				)}
			</div>
		);
	}
}

export default Header;
