import axios from 'axios/index';

type prepareMethod = (path: string, params: any) => any;

const prepareAds: prepareMethod = async (path, params) => {
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

export default {
	ads: prepareAds,
};