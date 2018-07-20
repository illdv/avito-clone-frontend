import { AxiosWrapper } from './AxiosWrapper';
import { ICreateAdRequest } from 'client/common/ads/interface';

function get() {
	return AxiosWrapper.get('/ads');
}

function getMy() {
	return AxiosWrapper.get('/ads', { my: 1 });
}

function show(id) {
	return AxiosWrapper.get(`/ads/${id}`);
}

function create(request: ICreateAdRequest) {
	return AxiosWrapper.post(`/ads/`, request);
}

function remove(id: string) {
	return AxiosWrapper.deleteResponse(`/ads/${id}`);
}

export const AdsAPI = {
	get,
	getMy,
	show,
	create,
	remove,
};
