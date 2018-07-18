import { default as axios } from 'axios';

type prepareMethod = (path: string, params: any) => any;

export const ads: prepareMethod = async () => {
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