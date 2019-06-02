import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Bounding extends Component {
	state = {
		img: null,
		rect: null,
	};

	initialize = () => {
		let img = new Image();
		img.src = `${this.props.data.src}`;
		img.crossOrigin = 'Anonymous';
		img.onload = () => {
			this.setState({ img: img }, () => {
				this.initCanvas();
			});
		};
	};

	componentDidMount() {
		this.initialize();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.rect !== this.state.rect) {
			this.redrawCanvas();
		}
	}

	submit = () => {
		if (this.state.rect) {
			const p = this.state.rect.pos;
			this.props.onSubmit(`${p.l},${p.t},${p.l + p.w},${p.t + p.h}`);
		} else {
			alert('영역을 선택해주세요');
		}
	};

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
								{this.state.rect && (
									<img
										src={this.state.rect.url}
										onClick={e => {
											this.setState({
												rect: null,
											});
										}}
									/>
								)}
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
					<div> Loading Image... </div>
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
						rect: this.getCroppedImage(
							startX,
							startY,
							e.offsetX,
							e.offsetY,
							wRatio,
							hRatio
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
		const r = this.state.rect;
		if (r) {
			canvasCtx.strokeRect(r.canvas.l, r.canvas.t, r.canvas.w, r.canvas.h);
		}
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
