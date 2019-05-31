import classImage from './static/menu_classification.png';
import boundingImage from './static/menu_bounding.png';
import soundImage from './static/menu_sound.png';
import natureImage from './static/menu_nature.png';
import landmarkImage from './static/menu_landmark.png';
import sentimentImage from './static/menu_sentiment.png';

export const MethodMenusData = [
	{
		title: 'Classification',
		link: '/label/class',
		img: classImage,
		description:
			'Classify images! Classify images! Classify  ! Classify images! Classify images! Classify images! Classify images! Classify images! Classify images! Classify images! ',
	},
	{
		title: 'Bounding Box',
		link: '/label/bounding',
		img: boundingImage,
		description:
			'Find object! Find object! Find object! Find object! F object! Find ! Find object! Find object! Find object! Find object! ',
	},
	{
		title: 'Sound Classification',
		link: '/label/audio',
		img: soundImage,
		description:
			'Classify sound! Classify sound! Classify sound! Classify sound! Classify sound! Classify sound! Classify sound! Classify sound! ',
	},
];

export const ThemeMenuData = [
	{
		title: 'Nature / Animal',
		link: '/label/nature',
		img: natureImage,
		description:
			'Label nature related data! Label nature related data! Label nature related data! Label nature related data! Label nature related data! ',
	},
	{
		title: 'Places / Landmark',
		link: '/label/place',
		img: landmarkImage,
		description:
			'Label place data! Label place data! Label place data! Label place data! Label place data! Label place data! ',
	},
	{
		title: 'Sentiment',
		link: '/label/sentiment',
		img: sentimentImage,
		description:
			'Label sentiment data. Label sentiment data. Label sentiment data. Label sentiment data. Label sentiment data. Label sentiment data. Label sentiment data. ',
	},
];
