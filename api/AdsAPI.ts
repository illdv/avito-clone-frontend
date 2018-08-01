import { AxiosWrapper } from './AxiosWrapper';
import { AdsActionType, IAds, ICreateAdRequest, IEditAdRequest } from 'client/common/ads/interface';

function get() {
	return AxiosWrapper.get('/ads');
}

function getMy() {
	return AxiosWrapper.get('/ads', { my: 1 });
}

function show(id) {
	return AxiosWrapper.get(`/ads/${id}`);
}

function create({ images, options, ...ads }: ICreateAdRequest) {
	const files    = images.map(img => img.file);
	const formData = new FormData();
	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		formData.append(`images[${i}]`, file);
	}

	Object.entries(ads).forEach(([key, value]) => {
		formData.append(key, value);
	});

	options.forEach((option, index) => {
		formData.append(`options[${index}][id]`, String(option.id));
		formData.append(`options[${index}][value]`, option.value);
	});

	return AxiosWrapper.post(`/ads/`, formData, {
		headers: { 'Accept': 'application/json' },
	});
}

function edit({ images, options, ...ads }: IEditAdRequest) {

	const files    = images.map(img => img.file);
	const formData = new FormData();

	for (let i = 0; i < files.length; i++) {
		const file = files[i];
		formData.append(`images[${i}]`, file);
	}

	Object.entries(ads).forEach(([key, value]) => {
		formData.append(key, value);
	});

	options.forEach((option, index) => {
		formData.append(`options[${index}][id]`, String(option.id));
		formData.append(`options[${index}][value]`, option.value);
	});

	formData.append('_method', 'put');
	return AxiosWrapper.post(`/ads/${ String(ads.ad_id) }`, formData, {
		headers: { 'Accept': 'application/json' },
	});
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

function deleteImage(id: string) {
	return AxiosWrapper.deleteResponse(`/images/${id}`);
}

export const AdsAPI = {
	get,
	getMy,
	show,
	create,
	remove,
	edit,
	useAction,
	deleteImage,
	similar,
};
