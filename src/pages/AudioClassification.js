import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';

class AudioClassification extends Component {
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
		this.setState({ answer: event.target.value });
	};

	render() {
		return (
			<div className="label-class">
				<h5>Audio Classification</h5>
				<div className="content">
					<div className="audio col-lg-7">
						<ReactAudioPlayer src={this.props.data.src} controls />
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
			</div>
		);
	}
}

export default withRouter(AudioClassification);
