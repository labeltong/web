import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';
import { getDataByMethod, submitAnswer } from '../api';

class AudioClassification extends Component {
	state = { id: null, audio: null, options: [], answer: null };

	componentDidMount() {
		getDataByMethod(3)
			.then(data => {
				this.setState({
					id: data.ID,
					audio: data.DataPath,
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
				<h5>Audio Classification</h5>
				<div className="content">
					<div className="audio col-lg-7">
						<ReactAudioPlayer src={this.state.audio} controls />
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
