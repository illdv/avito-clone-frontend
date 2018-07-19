import { default as axios } from 'axios';

const instance = axios.create({
	baseURL: process.env.API_URL,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
});

function get(apiMethod: string, urlParams: { [key: string]: string | number } = {}) {
	return instance.get(apiMethod, { params: urlParams });
}

function post(apiMethod: string, body: any = {}) {
	return instance.post(apiMethod, body);
}

function put(apiMethod: string, body: any = {}) {
	return instance.put(apiMethod, body);
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
