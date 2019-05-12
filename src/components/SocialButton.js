import React from 'react';
import SocialLogin from 'react-social-login';
import {
	FacebookLoginButton,
	GoogleLoginButton,
} from 'react-social-login-buttons';

import appID from '../socialAppID';

export const GoogleButton = ({ onLoginSuccess, onLoginFailure }) => {
	const SocialGButton = SocialLogin(({ triggerLogin, ...props }) => (
		<GoogleLoginButton onClick={triggerLogin} {...props} />
	));

	return (
		<SocialGButton
			provider="google"
			appId={appID.googleAppID}
			onLoginSuccess={onLoginSuccess}
			onLoginFailure={onLoginFailure}
		/>
	);
};
export const FacebookButton = ({ onLoginSuccess, onLoginFailure }) => {
	const SocialGButton = SocialLogin(({ triggerLogin, ...props }) => (
		<FacebookLoginButton onClick={triggerLogin} {...props} />
	));

	return (
		<SocialGButton
			provider="facebook"
			appId={appID.facebookAppID}
			onLoginSuccess={onLoginSuccess}
			onLoginFailure={onLoginFailure}
		/>
	);
};
