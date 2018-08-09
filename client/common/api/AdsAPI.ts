import { AxiosWrapper } from './AxiosWrapper';
import { AdsActionType, ICreateAdRequest, IEditAdRequest } from '../entities/user/modules/owned-ads/interfaces';
import { getMyAd, getDataForAdsIndexPage } from 'server/api/ad';
import { formatData } from 'server/router/prepares';

function get() {
	return AxiosWrapper.get('/ads');
}

function getPage(page) {
	return AxiosWrapper.get(`/ads?${formatData(getDataForAdsIndexPage)}&count=32&page=${page}`);
}

function getMy() {
	return	AxiosWrapper.get(`/ads?my=1&${formatData(getMyAd)}`);
}

function show(id) {
	return AxiosWrapper.get(`/ads/${id}`);
}

function getCity(id) {
	return AxiosWrapper.get(`../../city/${id}`);
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
		if (option.value && option.value.length > 0) {
			formData.append(`options[${index}][id]`, String(option.id));
			formData.append(`options[${index}][value]`, option.value);
		}
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
		if (option.value && option.value.length > 0) {
			formData.append(`options[${index}][id]`, String(option.id));
			formData.append(`options[${index}][value]`, option.value);
		}
	});

	formData.append('_method', 'put');
	return AxiosWrapper.post(`/ads/${ String(ads.ad_id) }`, formData, {
		headers: { 'Accept': 'application/json' },
	});
}

function remove(ids: number[]) {
	return AxiosWrapper.post(`/ads`, {
		ids,
		_method: 'delete',
	});
}

function useAction(ids: number[], actionType: AdsActionType) {
	return AxiosWrapper.post (`ads/change-state`, {
		ids,
		action: actionType,
	});
}

function similar(sort: string, id: number) {
	return AxiosWrapper.get(`ad/${id}/similar/${sort}`);
}

function deleteImage(id: string) {
	return AxiosWrapper.deleteResponse(`/images/${id}`);
}

export const AdsAPI = {
	get,
	getPage,
	getMy,
	show,
	create,
	remove,
	edit,
	useAction,
	deleteImage,
	similar,
	getCity,
};
