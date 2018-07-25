import { AxiosWrapper } from './AxiosWrapper';
import { IAds, ICreateAdRequest, AdsActionType } from 'client/common/ads/interface';

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
	const files    = images.map(img => img.file);
	const formData = new FormData();
	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		formData.append(`images[${i}]`, file);
	}

	Object.entries(ads).forEach(([key, value]) => {
		formData.append(key, value);
	});

	return AxiosWrapper.post(`/ads/`, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
}

function edit(request: IAds) {
	return AxiosWrapper.put(`/ads/${request.id}`, request);
}

function remove(id: string) {
	return AxiosWrapper.deleteResponse(`/ads/${id}`);
}

function useAction(id: string, actionType: AdsActionType) {
	return AxiosWrapper.put(`/ads/${id}/state/${actionType}`);
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
	edit,
	useAction,
	similar,
};
