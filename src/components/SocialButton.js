import React from 'react';
import SocialLogin from 'react-social-login';
import {
	FacebookLoginButton,
	GoogleLoginButton,
} from 'react-social-login-buttons';

export const FacebookButton = ({ onClick, ...props }) => {
	let FButton = SocialLogin(FacebookLoginButton);
	return <FButton provider="facebook" onClick={onClick} {...props} />;
};
export const GoogleButton = ({ onClick, ...props }) => {
	let GButton = SocialLogin(GoogleLoginButton);
	return <GButton provider="google" onClick={onClick} {...props} />;
};
