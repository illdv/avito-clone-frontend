import { AxiosWrapper } from './AxiosWrapper';

function get() {
	return AxiosWrapper.get('/ads');
}

function getMy() {
	return AxiosWrapper.get('/ads', { my: 1 });
}

function show(id) {
	return AxiosWrapper.get(`/ads/${id}`);
}

export const AdsAPI = {
	get,
	getMy,
	show,
};
