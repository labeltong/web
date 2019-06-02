import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

class Classification extends Component {
	state = { options: [], answer: null };
	componentDidMount() {
		this.setState({ options: this.props.data.question.split(',') });
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (prevProps.data !== this.props.data) {
			this.setState({
				options: this.props.data.question.split(','),
				answer: null,
			});
		}
	}

	submit = () => {
		if (this.state.answer) {
			this.props.onSubmit(this.state.answer);
		}
	};

	onChangeAnswer = event => {
		this.setState({ answer: parseInt(event.target.value) });
	};

	render() {
		return (
			<div className="label-class">
				<h5>Classification</h5>
				<div className="content">
					<div className="image col-lg-7">
						<img src={`${this.props.data.src}`} alt="classification" />
					</div>
					<div className="control col-lg-4">
						<div className="options">
							{this.state.options.map((option, idx) => {
								return (
									<div key={idx} className="option">
										<input
											type="radio"
											name="class-option"
											value={idx + 1}
											checked={this.state.answer === idx + 1}
											onChange={this.onChangeAnswer}
										/>
										{option}
									</div>
								);
							})}
						</div>
						<button className="btn" onClick={this.submit}>
							Submit
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Classification);
