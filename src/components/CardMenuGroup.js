import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class CardMenu extends Component {
	render() {
		return (
			<div className="menu-section">
				<h5 className="title">{this.props.title}</h5>
				<div className="row">
					{this.props.menus.map(menu => {
						let onClick = e => {
							this.props.history.push(menu.link);
						};
						return (
							<div className="card-menu col-md-4" key={menu.title}>
								<div className="card">
									<div
										className="card-img"
										style={{ backgroundImage: `url(${menu.img})` }}
										alt="Card menu"
										onClick={onClick}
									/>
									<div className="card-body">
										<h5 className="card-title" onClick={onClick}>
											{menu.title}
										</h5>
										<p className="card-text" onClick={onClick}>
											{menu.description}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default withRouter(CardMenu);
