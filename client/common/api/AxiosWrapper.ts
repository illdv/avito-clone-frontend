import { AxiosRequestConfig, default as axios } from 'axios';

const instance = axios.create({
	baseURL: process.env.API_URL,
	headers: {
		'Accept-Language': 'en-US,en;q=0.9',
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
});

function get(apiMethod: string, urlParams: { [key: string]: string | number } = {}) {
	return instance.get(apiMethod, { params: urlParams });
}

function post(apiMethod: string, body: any = {}, config?: AxiosRequestConfig) {
	return instance.post(apiMethod, body, config);
}

function put(apiMethod: string, body: any = {}, config?: AxiosRequestConfig) {
	return instance.put(apiMethod, body, config);
}

function deleteResponse(apiMethod: string, body?: any) {
	return instance.delete(apiMethod, { data: body });
}

export const AxiosWrapper = {
	get,
	post,
	put,
	deleteResponse,
};
