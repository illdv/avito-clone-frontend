const axios = require('axios/index');

const prepareAds = async (path, params) => {
	const instance = axios.create({
		baseURL: process.env.API_URL,
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
	});

	const axiosData = await instance.get('/ads');
	return axiosData.data.data;
};

module.exports = {
	ads: prepareAds,
};