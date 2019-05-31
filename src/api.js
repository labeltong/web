const apiBaseUrl = 'http://54.180.195.179:13230';

var user = null;
var jwtToken = null;

export const socialLogin = (email, name, token) => {
	return new Promise((resolve, reject) => {
		login(email, token).then(jwt => {
			if (jwt) {
				user = { name, email };
				jwtToken = jwt;
				resolve(user);
			} else {
				registerUser(email, token, name, '').then(() => {
					login(email, token).then(jwt => {
						user = { name, email };
						jwtToken = jwt;
						resolve(user);
					});
				});
			}
		});
	});
};

export const login = (email, token) => {
	return new Promise((resolve, reject) => {
		fetch(`${apiBaseUrl}/auth?email=${email}&token=${token}`)
			.then(res => {
				res.text().then(result => {
					resolve(res.status === 200 ? result : null);
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

export const getDataByMethod = method => {
	return new Promise((resolve, reject) => {
		if (jwtToken) {
			fetch(`${apiBaseUrl}/dataset/dmethods/${method}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${jwtToken}`,
				},
			})
				.then(res => {
					res.json().then(result => {
						console.log('getDataByMethod: ', result);
						if (method === 1)
							resolve({
								id: result.ID,
								src: result.DataPath,
							});
						if (method === 2)
							resolve({
								id: result.ID,
								src: result.DataPath,
								options: result.Question.split(','),
							});
					});
				})
				.catch(err => {
					reject(err);
				});
		} else {
			reject({});
		}
	});
};

export const submitAnswer = (id, answer) => {
	return new Promise((resolve, reject) => {
		if (jwtToken) {
			fetch(`${apiBaseUrl}/dataset/answer/answer`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${jwtToken}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: user.email,
					data_id: id,
					answer_data: answer,
				}),
			})
				.then(res => {
					console.log('response: ', res);
					res.json().then(result => {
						resolve();
					});
				})
				.catch(err => {
					reject(err);
				});
		} else {
			reject({});
		}
	});
};
