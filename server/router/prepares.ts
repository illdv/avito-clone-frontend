import { default as axios } from 'axios';

type prepareMethod = (params: any, query: any) => any;

const instance = axios.create({
	baseURL: process.env.API_URL,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
});

export const ads: prepareMethod = async () => {

	const axiosData = await instance.get('/ads');
	return axiosData.data.data;
};

export  const ad: prepareMethod = async params => {
	const response = await instance.get(`/ads/${ params.id}`);
	return response.data;
};