import classificationImg from './static/ex_classification.png';
import boundingImg from './static/ex_bounding.png';

export const IntroNewsTestInput = [
	{
		title: 'LabelTong',
		content:
			'LabelTong service is now available! LabelTong service is now available! LabelTong service is now available! LabelTong service is now available! LabelTong service is now available! LabelTong service is now available! ',
		timestamp: '2019-03-04T10:35:24-08:00',
	},
	{
		title: 'Test Event (1)',
		content:
			'This is test event number 1. This is test event number 1. This is test event number 1.',
		timestamp: '2019-03-20T10:35:24-08:00',
	},
	// {
	// 	title: 'Test Event (2)',
	// 	content: 'This is test event number 2. This is test event number 2.',
	// 	timestamp: '2019-03-25T10:35:24-08:00',
	// },
];

export const exClassImg = classificationImg;
export const exClassOptions = ['CAT', 'DOG', 'HUMAN', 'CHICKEN', 'COFFEE'];

export const exBounding = boundingImg;
