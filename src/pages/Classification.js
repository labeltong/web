import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getDataByMethod, submitAnswer } from '../api';

class Classification extends Component {
	state = { id: null, src: null, options: [] };

	getProblem = () => {
		getDataByMethod(2)
			.then(result => {
				this.setState({ ...result });
			})
			.catch(err => {
				alert('Please sign in first');
				this.props.history.push('/');
			});
	};

	submit = () => {
		submitAnswer().then(result => {
			alert('제출 완료');
			this.getProblem();
		});
	};

	componentDidMount() {
		this.getProblem();
	}

	render() {
		return (
			<div className="label-class">
				<h5>Classification</h5>
				{this.state.src ? (
					<div className="content">
						<div className="image col-lg-7">
							<img src={this.state.src} alt="classification" />
						</div>
						<div className="control col-lg-4">
							<div className="options">
								{this.state.options.map(option => (
									<div className="option" key={option}>
										<input type="radio" name="class-option" value={option} />
										{option}
									</div>
								))}
							</div>
							<button className="btn" onClick={this.submit}>
								Submit
							</button>
						</div>
					</div>
				) : (
					<div> Loading ... </div>
				)}
			</div>
		);
	}
}

export default withRouter(Classification);
