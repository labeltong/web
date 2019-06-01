import React, { Component } from 'react';
import { getDataByMethod, getDataByTag, submitAnswer } from '../api';
import { withRouter } from 'react-router-dom';
import Bounding from './Bounding';
import Classification from './Classification';
import AudioClassification from './AudioClassification';

const types = ['bounding', 'class', 'audio'];

class Label extends Component {
	state = {
		labelType: null,
		labelData: { id: null, src: null, question: null },
	};

	componentDidMount() {
		this.fetchData();
	}

	fetchData = () => {
		if (this.props.user) {
			if (!this.props.match.path.startsWith('/label/tag')) {
				const idx = types.indexOf(this.props.match.params.method) + 1;
				if (idx !== 0) {
					getDataByMethod(idx, this.props.user.jwt).then(this.setData);
				} else {
					this.props.history.push('/');
				}
			} else {
				getDataByTag(this.props.match.params.tagID, this.props.user.jwt).then(
					this.setData
				);
			}
		} else {
			alert('로그인 해주세요');
			this.props.history.push('/');
		}
	};

	setData = data => {
		console.log(data);
		this.setState({
			labelType: data.AnswerType,
			labelData: {
				id: data.ID,
				src: data.DataPath,
				question: data.Question,
			},
		});
	};

	render() {
		if (this.state.labelType)
			return [
				<Bounding data={this.state.labelData} onSubmit={this.onSubmit} />,
				<Classification data={this.state.labelData} onSubmit={this.onSubmit} />,
				<AudioClassification
					data={this.state.labelData}
					onSubmit={this.onSubmit}
				/>,
			][this.state.labelType - 1];
		else return <div>Loading .... </div>;
	}

	onSubmit = answer => {
		console.log('submitting answer', answer);
		submitAnswer(
			this.state.labelData.id,
			answer,
			this.props.user.email,
			this.props.user.jwt
		).then(() => {
			this.fetchData();
		});
		this.props.updateUser();
	};
}

export default withRouter(Label);
