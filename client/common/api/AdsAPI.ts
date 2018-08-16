import {AxiosWrapper} from './AxiosWrapper';
import {AdsActionType, ICreateAdRequest, IEditAdRequest} from '../entities/user/modules/owned-ads/interfaces';
import { getQueryWithLocation } from '../utils/utils';

import {getMyAd, getDataForAdsIndexPage} from 'server/api/ad';
import * as queryString from 'query-string';
import {AxiosPromise} from 'axios';
import { formatData } from 'server/router/prepares';

export class AdsAPI {
	public static queryStr = data => {
		return queryString.stringify(data, {arrayFormat: 'bracket'});
	}

	public static get(data): AxiosPromise<any> {
		const query = getQueryWithLocation();
		return AxiosWrapper.get(`/ads?${formatData({...query, ...getDataForAdsIndexPage})}&${data}`);
	}

	public static getPage(sort, page): AxiosPromise<any>  {
		const query = getQueryWithLocation();
		query.page = page;
		return AxiosWrapper.get(`/ads?${formatData({...query, ...getDataForAdsIndexPage})}&${sort}`);
	}

	public static getMy(): AxiosPromise<any>  {
		return AxiosWrapper.get(`/ads?my=1&${AdsAPI.queryStr(getMyAd)}`);
	}

	public static show(id): AxiosPromise<any>  {
		return AxiosWrapper.get(`/ads/${id}`);
	}

	public static getCity(id): AxiosPromise<any>  {
		return AxiosWrapper.get(`../../cities/${id}`);
	}

	public static getRegionsById(id) {
		return AxiosWrapper.get(`../../countries/${id}/regions`);
	}

	public static getCitiesById(id) {
		return AxiosWrapper.get(`../../regions/${id}/cities`);
	}

	public static create = ({images, options, ...ads}: ICreateAdRequest): AxiosPromise<any> => {
		const formData =  AdsAPI.fill(images, options, ads);
		return AxiosWrapper.post(`/ads/`, formData, {
			headers: {Accept: 'application/json'},
		});
	}

	public static edit({images, options, ...ads}: IEditAdRequest): AxiosPromise<any>  {
		const formData = AdsAPI.fill(images, options, ads);

		formData.append('_method', 'put');

		return AxiosWrapper.post(`/ads/${ String(ads.ad_id) }`, formData, {
			headers: {Accept: 'application/json'},
		});
	}

	public static remove(ids: number[]): AxiosPromise<any>  {
		return AxiosWrapper.post(`/ads`, {ids, _method: 'delete'});
	}

	public static useAction(ids: number[], actionType: AdsActionType): AxiosPromise<any>  {
		return AxiosWrapper.post(`ads/change-state`, {
			ids,
			action: actionType,
		});
	}

	public static similar(sort: string, id: number): AxiosPromise<any>  {
		return AxiosWrapper.get(`ad/${id}/similar/${sort}`);
	}

	public static deleteImage(id: number): AxiosPromise<any>  {
		return AxiosWrapper.deleteResponse(`/images/${id}`);
	}

	private static fill(images, options, ...ads): FormData {

		const files = images.map(img => img.file);
		const formData = new FormData();

		for (let i = 0; i < files.length; i++) {
			formData.append(`images[${i}]`, files[i]);
		}

		Object.entries(ads[0]).forEach(([key, value]) => {
			formData.append(key, value);
		});

		options.forEach((option, index) => {
			if (option.value && option.value.length > 0) {
				formData.append(`options[${index}][id]`, String(option.id));
				formData.append(`options[${index}][value]`, option.value);
			}
		});
		return formData;
	}
}
