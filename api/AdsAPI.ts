import { AxiosWrapper } from './AxiosWrapper';
import { IAds, ICreateAdRequest } from 'client/common/ads/interface';

function get() {
	return AxiosWrapper.get('/ads');
}

function getMy() {
	return AxiosWrapper.get('/ads', { my: 1 });
}

function show(id) {
	return AxiosWrapper.get(`/ads/${id}`);
}

function create({ images, ...ads }: ICreateAdRequest) {
	return AxiosWrapper.post(`/ads/`, ads, { headers: { 'Content-Type': 'multipart/form-data' } });
}

function switchFavorite(id) {
	return AxiosWrapper.post(`/ads/switch-favorite/${id}`);
}

function edit(request: IAds) {
	return AxiosWrapper.put(`/ads/${request.id}`, request);
}

function remove(id: string) {
	return AxiosWrapper.deleteResponse(`/ads/${id}`);
}

function approve(id: string) {
	return AxiosWrapper.put(`/ads/approve/${id}`);
}

function activate(id: string) {
	return AxiosWrapper.put(`/ads/activate/${id}`);
}

function complete(id: string) {
	return AxiosWrapper.put(`/ads/complete/${id}`);
}

export const AdsAPI = {
	get,
	getMy,
	show,
	create,
	switchFavorite,
	remove,
	approve,
	activate,
	complete,
	edit,
};
