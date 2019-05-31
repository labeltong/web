import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getDataByMethod, submitAnswer } from '../api';

class Bounding extends Component {
	state = {
		img: null,
		rects: [],
	};

	getProblem = () => {
		getDataByMethod(1).then(result => {
			this.setState({ ...result }, () => {
				// get image, init canvas with the image
				let img = new Image();
				img.src = this.state.src;
				img.crossOrigin = 'Anonymous';
				img.onload = () => {
					this.setState({ img: img }, () => {
						this.initCanvas();
					});
				};
			});
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

	componentDidUpdate(prevProps, prevState) {
		if (prevState.rects.length !== this.state.rects.length) {
			this.redrawCanvas();
		}
	}

	render() {
		return (
			<div className="label-bounding">
				<h5>Bounding</h5>
				{this.state.img ? (
					<div className="content">
						<div className="target col-lg-6">
							<h6>Find '{this.props.target}' in image below </h6>
							<div className="canvas-wrapper">
								<canvas ref="canvas">
									Your browser does not support the canvas element.
								</canvas>
							</div>
						</div>
						<div className="control col-lg-4">
							<div className="images">
								{this.state.rects.map((r, idx) => (
									<img
										src={r.url}
										key={idx}
										id={idx}
										onClick={e => {
											let id = parseInt(e.target.id);
											this.setState({
												rects: this.state.rects.filter((r, i) => i !== id),
											});
										}}
									/>
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

	initCanvas = () => {
		let canvas = this.refs.canvas;
		const canvasCtx = canvas.getContext('2d');

		// set width to 100% of parent,
		// set height to make image preserve ratio
		const wRatio =
			canvas.parentElement.offsetWidth / this.state.img.naturalWidth;
		const hRatio =
			canvas.parentElement.offsetHeight / this.state.img.naturalHeight;

		canvas.width = Math.floor(wRatio * this.state.img.naturalWidth);
		canvas.height = Math.floor(hRatio * this.state.img.naturalHeight);

		let drag, startX, startY;
		canvas.onmousedown = e => {
			drag = true;
			startX = e.offsetX;
			startY = e.offsetY;
		};
		canvas.onmousemove = e => {
			if (drag) {
				this.redrawCanvas();

				// draw current rect
				let curX = e.offsetX;
				let curY = e.offsetY;
				canvasCtx.strokeRect(startX, startY, curX - startX, curY - startY);
			}
		};
		canvas.onmouseup = e => {
			if (drag) {
				if (
					Math.abs(startX - e.offsetX) >= 30 &&
					Math.abs(startY - e.offsetY) >= 30
				) {
					this.setState({
						rects: this.state.rects.concat(
							this.getCroppedImage(
								startX,
								startY,
								e.offsetX,
								e.offsetY,
								wRatio,
								hRatio
							)
						),
					});
				} else {
					this.redrawCanvas();
				}
				drag = false;
			}
		};

		// draw image
		this.redrawCanvas();
	};

	redrawCanvas = () => {
		const canvas = this.refs.canvas;
		const canvasCtx = canvas.getContext('2d');

		canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
		canvasCtx.drawImage(this.state.img, 0, 0, canvas.width, canvas.height);

		canvasCtx.setLineDash([6]);
		this.state.rects.forEach(r => {
			canvasCtx.strokeRect(r.canvas.l, r.canvas.t, r.canvas.w, r.canvas.h);
		});
	};

	getCroppedImage = (x1, y1, x2, y2, wRatio, hRatio) => {
		// temp canvas
		let bufCanvas = document.createElement('canvas');
		const bufCtx = bufCanvas.getContext('2d');

		// offsets for original image
		const l = Math.floor(Math.min(x1, x2) / wRatio);
		const t = Math.floor(Math.min(y1, y2) / hRatio);
		const w = Math.floor(Math.abs(x2 - x1) / wRatio);
		const h = Math.floor(Math.abs(y2 - y1) / hRatio);

		bufCanvas.width = w;
		bufCanvas.height = h;

		bufCtx.drawImage(this.state.img, l, t, w, h, 0, 0, w, h);
		return {
			url: bufCanvas.toDataURL(),
			pos: { l, t, w, h },
			canvas: {
				l: Math.min(x1, x2),
				t: Math.min(y1, y2),
				w: Math.abs(x2 - x1),
				h: Math.abs(y2 - y1),
			},
		};
	};
}

Bounding.defaultProps = {
	target: 'Face',
};

export default withRouter(Bounding);
