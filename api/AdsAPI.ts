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

function create(request: ICreateAdRequest) {
	return AxiosWrapper.post(`/ads/`, request);
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

function similar(sort: string, id: string) {
	return AxiosWrapper.get(`ad/${id}/similar/${sort}`);
}

export const AdsAPI = {
	get,
	getMy,
	show,
	create,
	remove,
	approve,
	activate,
	complete,
	edit,
	similar,
};
