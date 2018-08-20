import axios from 'axios';

const instance = axios.create({
	baseURL: process.env.SSR_HOST,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
});

export const get = async (prepareName: string, query?: object, param?: object) => {
	return instance.post('/prepare', { prepareName, query, param });
};