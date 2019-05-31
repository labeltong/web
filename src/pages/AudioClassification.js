import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactAudioPlayer from 'react-audio-player';

class AudioClassification extends Component {
	state = {
		audio:
			'https://file-examples.com/wp-content/uploads/2017/11/file_example_WAV_1MG.wav',
		options: ['sentiment1', 'sentiment2', 'sentiment3', 'sentiment4'],
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
						<div className="options">
							{this.state.options.map(option => (
								<div className="option" key={option}>
									<input type="radio" name="class-option" value={option} />
									{option}
								</div>
							))}
						</div>
						<button
							className="btn"
							onClick={() => {
								this.props.history.push('/');
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
