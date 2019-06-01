import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { GoogleButton } from './SocialButton';

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
							<UserMenu user={this.props.user} onLogout={this.props.onLogout} />
						) : (
							<LoginMenu onLogin={this.props.onLogin} />
						)}
					</ul>
				</div>
			</nav>
		);
	}
}

class UserMenu extends Component {
	state = { show: false };

	render() {
		return (
			<div className="user-menu">
				<i className="fas fa-coins" /> {this.props.user.point}
				<button
					className="btn"
					onClick={() => {
						this.setState({ show: !this.state.show });
					}}
				>
					<i className="fas fa-user mr-2" />
					{this.props.user.name}
				</button>
				<div
					className="dropdown"
					style={this.state.show ? {} : { display: 'none' }}
				>
					<button className="btn" onClick={this.props.onLogout}>
						<i className="fas fa-sign-out-alt" /> Logout
					</button>
				</div>
			</div>
		);
	}
}

class LoginMenu extends Component {
	state = { show: false };

	render() {
		return (
			<div className="login-menu">
				<button
					className="btn"
					onClick={() => {
						this.setState({ show: !this.state.show });
					}}
				>
					<i className="fas fa-sign-in-alt" />
				</button>
				<div
					className="dropdown"
					style={this.state.show ? {} : { display: 'none' }}
				>
					<GoogleButton
						onLoginSuccess={this.props.onLogin}
						onLoginFailure={err => {
							console.error(err);
						}}
					/>
				</div>
			</div>
		);
	}
}

export default Header;
