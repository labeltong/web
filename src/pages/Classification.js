import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { getDataByMethod, submitAnswer } from '../api';

class Classification extends Component {
	state = { id: null, img: '', options: [], answer: null };
	componentDidMount() {
		getDataByMethod(2)
			.then(data => {
				this.setState({
					id: data.ID,
					img: data.DataPath,
					options: data.Question.split(','),
				});
			})
			.catch(() => {
				alert('로그인 해주세요');
				this.props.history.push('/');
			});
	}

	submit = () => {
		if (this.state.answer) {
			submitAnswer(this.state.id, this.state.answer);
		}
	};

	onChangeAnswer = event => {
		this.setState({ answer: event.target.value });
	};

	render() {
		return (
			<div className="label-class">
				<h5>Classification</h5>
				{this.state.img ? (
					<div className="content">
						<div className="image col-lg-7">
							<img src={`${this.state.img}`} alt="classification" />
						</div>
						<div className="control col-lg-4">
							<div
								className="options"
								onChange={event => {
									this.onChangeAnswer(event);
								}}
							>
								{this.state.options.map((option, idx) => {
									return (
										<div key={idx} className="option">
											<input type="radio" name="class-option" value={idx + 1} />
											{option}
										</div>
									);
								})}
							</div>
							<button
								className="btn"
								onClick={() => {
									this.submit();
								}}
							>
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
