import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CardMenu extends Component {
	render() {
		return (
			<div className="menu-section">
				<h5 className="title">Label by Method</h5>
				<div className="row">
					{this.props.menus.map(menu => (
						<div className="card-menu col-md-4">
							<div className="card">
								<img className="card-img" src={menu.img} alt="Card menu" />
								<div className="card-body">
									<h5 className="card-title">{menu.title}</h5>
									<p className="card-text">{menu.description}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default CardMenu;
