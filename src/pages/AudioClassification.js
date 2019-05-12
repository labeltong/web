import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class AudioClassification extends Component {
	state = { audio: '', options: [] };

	componentDidMount() {
		// TODO: update fetch url for audio source
		// fetch audio
		// fetch('http://54.180.195.179:19432/dataset/list/db_test/get').then(res => {
		// 	res.json().then(data => {
		// 		this.setState({
		// 			audio: data.base_64_data,
		// 			options: data.Dataq,
		// 		});
		// 	});
		// });
	}

	render() {
		return (
			<div className="label-audio">
				<h5>Audio Classification</h5>
				{this.state.img ? (
					<div className="content">
						<div className="image col-lg-7">
							<audio src={`data:image/png;base64, ${this.state.img}`} />
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
				) : (
					<div> Loading ... </div>
				)}
			</div>
		);
	}
}

export default withRouter(AudioClassification);
