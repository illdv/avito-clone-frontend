import { default as axios } from 'axios';
import * as queryString from 'query-string';

import {
	categoryQueueToBreadcrumbsFormat,
	findCategoriesQueueById,
	getLocationNameByLocations,
	getLocationsIdByRequest,
} from '../utils/categoryPrepare';

import { getDataForAdShowPage, getDataForAdsIndexPage } from '../api/ad';
import { getLitleCategories } from '../api/category';
import { queryStringifyPlus, getQueryWithLocation } from './utils';

interface ISugar {
	params?: any;
	query?: any;
	path?: string;
	accumulation?: any;
}

type prepareMethod = (sugar: ISugar, req: any) => any;

const instance = axios.create({
	baseURL: process.env.API_URL,
	headers: {
		'Accept': 'application/json',
		'Accept-Language': 'en-US,en;q=0.9',
		'Content-Type': 'application/json',
	},
});

instance.interceptors.response.use(response => {
	return response;
});

export const formatData = (data): string => {
	return queryStringifyPlus(data);
};

export const adsPaginationPage: prepareMethod = async (sugar, req) => {
	try {
		const query = getQueryWithLocation(req);
		const orderBy = 'orderBy[created_at]=desc';

		const response = await instance.get(`/ads?${orderBy}&${formatData({ ...query, ...getDataForAdsIndexPage })}`);
		const ads      = response.data.data;
		const vip      = response.data.vip;
		const lastPage = response.data.last_page;
		return { ads, vip, lastPage };
	} catch (e) {
		console.log(e);
	}
};

export const adForShow: prepareMethod = async ({ params }) => {
	try {
		const response = await instance.get(`/ads/${params.id}?${formatData(getDataForAdShowPage)}`);
		const ad       = response.data.ad;
		const similars = response.data.similars;
		return { ad, similars };
	} catch (error) {
		console.log(error);
	}
};

export const categories: prepareMethod = async () => {
	const response = await instance.get(`/categories?${formatData(getLitleCategories)}`);

	return response.data;
};

export const categoriesByLocation: prepareMethod = async (sugar, req) => {
	const query = getQueryWithLocation(req);

	const response = await instance.get(`/categories?${formatData({ ...query, ...getLitleCategories })}`);

	return response.data;
};

const getLiteAdsByQueryString = async (queryStringParams: string) => {
	const response = await instance.get(`/ads/?${ queryStringParams }`);
	return response.data;
};

export const location: prepareMethod = async (sugar, req) => {
	const { idCountry, idRegion, idCity } = getLocationsIdByRequest(req);

	const countries = await getCountries(null, req);

	let regions = [];

	if (idCountry) {
		regions = regions.concat(await getRegions({ query: { id: idCountry } }, req));
	}

	let cities = [];

	if (idRegion) {
		cities = cities.concat(await getCities({ query: { id: idRegion } }, req));
	}

	return {
		session: {
			idCountry,
			idRegion,
			idCity,
		},
		local: {
			idCountry,
			idRegion,
			idCity,
		},
		loaded: {
			session: {
				countries,
				regions,
				cities,
			},
			local: {
				countries,
				regions,
				cities,
			},
		},
		locationName: getLocationNameByLocations(idCountry, idRegion, idCity, countries, regions, cities),
	};
};

export const query: prepareMethod = async (sugar, req) => {
	const queryStr = req.url.match(/\?([^]+)/);

	const optionsStrings = queryStr && queryStr[1].match(/(options[^&]+)/g);

	const options = {};

	if (optionsStrings) {
		optionsStrings.forEach(optionString => {
			const optionsParams = optionString.match(/options\[([^&]+)\]=([^]+)/);

			if (optionsParams) {
				options[optionsParams[1]] = optionsParams[2];
			}
		});
	}

	return { ...sugar.query, options };
};

const getInstanceWithLanguageByReq = req => {
	const axiosInstance = axios.create({
		baseURL: process.env.API_FOR_LOCATION,
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Accept-Language': req.headers['accept-language'],
		},
	});

	/*axiosInstance.interceptors.response.use(response => {
		console.log('---------------------------------------------------------');
		console.log('url = ', response.config.url);
		console.log('data = ', JSON.stringify(response.data));
		return response;
	});*/

	return axiosInstance;
};

export const getCountries: prepareMethod = async (sugar, req) => {
	try {
		const response = await getInstanceWithLanguageByReq(req).get('/countries');
		return response.data;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const getRegions: prepareMethod = async ({ query }, req) => {
	try {
		const response = await getInstanceWithLanguageByReq(req).get(`/countries/${query.id}/regions/%20`);
		return response.data;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const getCities: prepareMethod = async ({ query }, req) => {
	try {
		const response = await getInstanceWithLanguageByReq(req).get(`/regions/${query.id}/cities/%20`);
		return response.data;
	} catch (err) {
		console.log(err);
		return [];
	}
};

function getNewWhereLike(query) {
	const newQueryParams: any = { ...query };

	const queryData = {};

	if (newQueryParams && newQueryParams.whereLike) {
		queryData['whereLike[title]']       = newQueryParams.whereLike.title;
		queryData['whereLike[body]']        = newQueryParams.whereLike.body;
		queryData['whereLike[description]'] = newQueryParams.whereLike.description;
	}

	return `&${queryString.stringify(queryData)}`;
}

export const searchUrl: prepareMethod = async ({ query = { currentPage: '1' }, accumulation }, req) => {
	try {
		const mainQuery = { ...accumulation.query || query };
		return formatData({
			...getDataForAdsIndexPage,
			...mainQuery,
		});
	} catch (e) {
		return '';
	}
};

export const search: prepareMethod = async ({ query = { currentPage: '1' }, accumulation }, req) => {
	try {
		const response = await getLiteAdsByQueryString(accumulation.searchUrl);

		const { current_page, last_page, per_page, total } = response;

		const pagination = {
			current_page,
			last_page,
			per_page,
			total,
		};

		return {
			ads: response.data,
			pagination,
		};

	} catch (err) {
		console.log('search = ', err);
		return [];
	}
};

async function getNameLocation(queryParams, req) {
	const hasRegion  = queryParams.region_id;
	const hasCountry = queryParams.country_id;
	const hasCity    = queryParams.city_id;

	if (hasCountry && hasRegion && hasCity) {
		const responseRegions = await getInstanceWithLanguageByReq(req).get(`/cities/${queryParams.city_id}`);
		return responseRegions.data[0].title;
	}

	if (hasCountry && hasRegion) {
		const responseRegions = await getInstanceWithLanguageByReq(req).get(`/regions/${queryParams.region_id}`);
		return responseRegions.data[0].title;
	}

	if (hasCountry) {
		const responseCountries = await getInstanceWithLanguageByReq(req).get(`/countries`);
		const country           = responseCountries.data.find(item => item.country_id === Number(queryParams.country_id));
		return country.title;
	}

	return null;
}

export const breadcrumbs: prepareMethod = async ({ query, accumulation }, req) => {
	const categoryQueue = findCategoriesQueueById(accumulation.categories, query.category);
	const nameLocation  = await getNameLocation(query, req);
	return [
		{
			title: `All listings in ${nameLocation || accumulation.location.locationName}`,
			href: '/category',
		},
		...categoryQueueToBreadcrumbsFormat(categoryQueue, categoryQueue.length),
	];
};

export const countriesTotal: prepareMethod = async ({ query: queryParams, accumulation }, req) => {
	try {
		const hasRegion  = queryParams.region_id;
		const hasCountry = queryParams.country_id;
		const hasCity    = queryParams.city_id;

		if (hasRegion && !hasCity) {
			const responseCity = await getInstanceWithLanguageByReq(req)
				.get(`/regions/${queryParams.region_id}/cities?appends[]=total_ads&${accumulation.searchUrl}`);
			return responseCity.data;
		}

		if (hasCountry && !hasCity) {
			const responseRegions = await getInstanceWithLanguageByReq(req)
				.get(`/countries/${queryParams.country_id}/regions?appends[]=total_ads&${accumulation.searchUrl}`);
			return responseRegions.data;
		}

		const responseCountries = await getInstanceWithLanguageByReq(req)
			.get(`/countries?appends[]=total_ads&${accumulation.searchUrl}`);
		return responseCountries.data;
	} catch (e) {
		console.log('countriesTotal = ', e);
		return [];
	}
};

export const categoriesTotal: prepareMethod = async ({ query, accumulation }, req) => {
	try {
		if (query.category_id) {
			const response = await instance
				.get(`/categories/${query.category_id}?appends[]=total_ads_count&${accumulation.searchUrl}`);
			return response.data.category.children;
		}
		return [];
	} catch (e) {
		console.log('categoriesTotal = ', e);
		return [];
	}
};