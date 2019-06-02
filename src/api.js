const apiBaseUrl = 'https://api.label-tong.ml';

export const socialLogin = (email, name, token) => {
	return new Promise((resolve, reject) => {
		login(email, token)
			.then(user => {
				resolve(user);
			})
			.catch(res => {
				if (res.status === 401) {
					registerUser(email, token, name, '').then(() => {
						login(email, token).then(user => {
							resolve(user);
						});
					});
				} else {
					reject(res);
				}
			});
	});
};

export const login = (email, token) => {
	return new Promise((resolve, reject) => {
		fetch(`${apiBaseUrl}/auth?email=${email}&token=${token}`)
			.then(res => {
				if (res.status !== 200) {
					reject(res);
					return;
				}

				res.text().then(jwt => {
					updateUserInfo(jwt).then(user => {
						resolve(user);
					});
				});
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const registerUser = (email, token, name, phone) => {
	return new Promise((resolve, reject) => {
		fetch(apiBaseUrl + '/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				token: token,
				name: name,
				phone_num: phone,
			}),
		})
			.then(res => {
				res.json().then(result => {
					resolve(result);
				});
			})
			.catch(err => {
				reject(err);
			});
	});
};

export const updateUserInfo = token => {
	return new Promise(resolve => {
		fetch(`${apiBaseUrl}/info`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then(res => {
			res.json().then(user => {
				resolve({
					name: user.Name,
					email: user.Email,
					point: user.Points,
					jwt: token,
				});
			});
		});
	});
};

export const getDataByMethod = (method, token) => {
	return new Promise((resolve, reject) => {
		fetch(`${apiBaseUrl}/dataset/dmethods/${method}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then(res => {
			res.json().then(data => {
				resolve(data);
			});
		});
	});
};

export const submitAnswer = (id, answer, email, token) => {
	return new Promise((resolve, reject) => {
		fetch(`${apiBaseUrl}/answer/answer`, {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: email,
				data_id: id,
				answer_data: answer.toString(),
			}),
		}).then(res => {
			res.json().then(data => {
				resolve(data);
			});
		});
	});
};

export const getTags = token => {
	return new Promise((resolve, reject) => {
		fetch(`${apiBaseUrl}/dataset/tags`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then(res => {
			res.json().then(data => {
				resolve(data);
			});
		});
	});
};

export const getDataByTag = (tag, token) => {
	return new Promise((resolve, reject) => {
		fetch(`${apiBaseUrl}/dataset/dtags/${tag}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then(res => {
			res.json().then(data => {
				resolve(data);
			});
		});
	});
};
