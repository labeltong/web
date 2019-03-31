import React, { Component } from 'react';

import introImg from '../static/main.png';
import { IntroNewsTestInput } from '../testInputs';
import moment from 'moment';

class Intro extends Component {
	render() {
		return (
			<div className="d-flex intro">
				<IntroMain />
				<IntroNews newsItems={this.props.recentNews} />
			</div>
		);
	}
}

const IntroMain = () => {
	return (
		<div
			className="main col-md-7"
			style={{ backgroundImage: `url(${introImg})` }}
		>
			<div className="wrapper">
				<p className="title">About Label Tong Service</p>
				<p className="content">
					Labeling data is most labor-intensive task in machine learning
					process. LabelTong service provides data labeling platform for image
					classification, bounding box and audio classification. Users can label
					data and receives points in reward for their effort.
				</p>
				<button className="btn ">Quick Start</button>
			</div>
		</div>
	);
};

class IntroNews extends Component {
	render() {
		return (
			<div className="news col-md-5">
				<div className="header">
					<p className="title">News</p>
					<div className="nav ml-auto align-self-center">
						<i className="fas fa-angle-left" />
						<i className="fas fa-angle-right" />
					</div>
				</div>
				<div className="items">
					{this.props.newsItems.map(news => (
						<div className="item" key={news.title}>
							<p className="title">{news.title}</p>
							<div className="content">{news.content}</div>
							<div className="time">
								<i className="far fa-clock" />
								{moment(news.timestamp).fromNow()}
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}

Intro.defaultProps = {
	recentNews: IntroNewsTestInput,
};
export default Intro;
