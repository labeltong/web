import React, { Component } from 'react';
import { exClassImg, exClassOptions } from '../testInputs';

class Classification extends Component {
	render() {
		return (
			<div className="label-class">
				<h5>Classification</h5>
				<div className="content">
					<div className="image col-lg-7">
						<img src={exClassImg} alt="classification image" />
					</div>
					<div className="control col-lg-4">
						<div className="options">
							{exClassOptions.map(option => (
								<div className="option">
									<input type="radio" name="class-option" value={option} />
									{option}
								</div>
							))}
						</div>
						<button className="btn">Submit</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Classification;
