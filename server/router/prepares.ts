import { default as axios } from 'axios';

import {
	getLocationNameByLocations,
	getLocationsIdByRequest,
	getSearchLocationsIdByRequest,
} from '../utils/categoryPrepare';

import { getDataForAdShowPage, getDataForAdsIndexPage } from '../api/ad';
import { getLitleCategories } from '../api/category';
import { getQueryWithLocation, queryStringifyPlus } from './utils';

interface ISugar {
	params?: any;
	query?: any;
	path?: string;
	accumulation?: any;
}

export type prepareMethod = (sugar: ISugar, req: any) => any;

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

export const orderBy = 'orderBy[created_at]=desc';

export const adsPaginationPage: prepareMethod = async (sugar, req) => {
	try {
		const query = getQueryWithLocation(req);
		const response = await instance.get(`/ads?${orderBy}&${queryStringifyPlus({ ...query, ...getDataForAdsIndexPage })}`);
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
		const response = await instance.get(`/ads/${params.id}?${queryStringifyPlus(getDataForAdShowPage)}`);
		const ad       = response.data.ad;
		const similars = response.data.similars;
		return { ad, similars };
	} catch (error) {
		console.log(error);
	}
};

export const categories: prepareMethod = async () => {
	const response = await instance.get(`/categories?${queryStringifyPlus(getLitleCategories)}`);

	return response.data;
};

export const categoriesByLocation: prepareMethod = async (sugar, req) => {
	const query = getQueryWithLocation(req);

	const response = await instance.get(`/categories?${queryStringifyPlus({ ...query, ...getLitleCategories })}`);

	return response.data;
};

const getLiteAdsByQueryString = async (queryStringParams: string) => {
	const response = await instance.get(`/ads/?${orderBy}&${ queryStringParams }`);
	return response.data;
};

export const location: prepareMethod = async (sugar, req) => {
	const cookies = await getLocationsIdByRequest(req);
	let search = {
		idCountry: null,
		idRegion: null,
		idCity: null,
	};

	const countries = await getCountries(null, req);

	let cookieRegions = [];

	if (cookies.idCountry) {
		cookieRegions = cookieRegions.concat(await getRegions({ query: { id: cookies.idCountry } }, req));
	}

	let cookieCities = [];

	if (cookies.idRegion) {
		cookieCities = cookieCities.concat(await getCities({ query: { id: cookies.idRegion } }, req));
	}

	if (sugar.path !== '/search') {
		search = cookies;
	} else {
		search = await getSearchLocationsIdByRequest(sugar, req);
	}

	let searchRegions = [];

	if (cookies.idCountry === search.idCountry) {
		searchRegions = cookieRegions;
	} else if (search.idCountry) {
		searchRegions = searchRegions.concat(await getRegions({ query: { id: search.idCountry } }, req));
	}

	let searchCities = [];

	if (cookies.idRegion === search.idRegion) {
		searchCities = cookieCities;
	} else if (search.idRegion) {
		searchCities = searchCities.concat(await getCities({ query: { id: search.idRegion } }, req));
	}

	const locationName = getLocationNameByLocations(cookies.idCountry, cookies.idRegion, cookies.idCity, countries,
		cookieRegions, cookieCities);
	const locationName2 = getLocationNameByLocations(search.idCountry, search.idRegion, search.idCity, countries,
		searchRegions, searchCities);

	console.log('locationName -', locationName);
	console.log('locationName2 -', locationName2);
	console.log('sugar -', sugar.path);
	return {
		session: {
			idCountry: cookies.idCountry,
			idRegion: cookies.idRegion,
			idCity: cookies.idCity,
			locationName: getLocationNameByLocations(cookies.idCountry, cookies.idRegion, cookies.idCity, countries,
				cookieRegions, cookieCities),
		},
		local: {
			idCountry: search.idCountry,
			idRegion: search.idRegion,
			idCity: search.idCity,
			locationName: getLocationNameByLocations(search.idCountry, search.idRegion, search.idCity, countries,
				searchRegions, searchCities),
		},
		loaded: {
			session: {
				countries,
				regions: cookieRegions,
				cities: cookieCities,
			},
			local: {
				countries,
				regions: searchRegions,
				cities: searchCities,
			},
		},
	};
};

export const query: prepareMethod = async (sugar, req) => {
	return { ...sugar.query };
};

export const getInstanceWithLanguageByReq = req => {
	const axiosInstance = axios.create({
		baseURL: process.env.API_FOR_LOCATION,
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Accept-Language': req.headers['accept-language'],
		},
	});

	axiosInstance.interceptors.response.use(response => {
		return response;
	});

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
		const response = await getInstanceWithLanguageByReq(req).get(`/countries/${query.id}/regions`);
		return response.data;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const getCities: prepareMethod = async ({ query }, req) => {
	try {
		const response = await getInstanceWithLanguageByReq(req).get(`/regions/${query.id}/cities`);
		return response.data;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const getRegionAndCountryByCity: prepareMethod = async ( sugar , req) => {
	try {
		const response = await getInstanceWithLanguageByReq(req).get(`/cities/${Number(sugar.query.city_id)}`);
		return ({
			idCountry: response.data[0].country_id,
			idRegion: response.data[0].region_id,
			idCity: Number(sugar.query.city_id),
		});
	} catch (err) {
		console.log(err);
		return ({
			idCountry: null,
			idRegion: null,
			idCity: null,
		});
	}
};

export const getCountryByRegion: prepareMethod = async ( sugar , req) => {
	try {
		const response = await getInstanceWithLanguageByReq(req).get(`/regions/${Number(sugar.query.region_id)}/cities`);
		return ({
			idCountry: response.data[0].country_id,
			idRegion: Number(sugar.query.region_id),
			idCity: null,
		});
	} catch (err) {
		console.log(err);
		return ({
			idCountry: null,
			idRegion: null,
			idCity: null,
		});
	}
};

export const searchUrl: prepareMethod = async ({ query = { currentPage: '1' }, accumulation }, req) => {
	try {
		const mainQuery           = { ...accumulation.query || query };
		return queryStringifyPlus({
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
			vip: response.vip,
			pagination,
			breadcrumbs: response.breadcrumbs,
			total: response.total,
		};

	} catch (err) {
		console.log('search = ', err);
		return [];
	}
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

		if (!hasCountry && !hasRegion && !hasCity) {
			const responseCountries = await getInstanceWithLanguageByReq(req)
				.get(`/countries?appends[]=total_ads&${accumulation.searchUrl}`);
			return responseCountries.data;
		}

		return [];
	} catch (e) {
		console.log('countriesTotal = ', e);
		throw e;
	}
};

export const categoriesTotal: prepareMethod = async ({ query, accumulation }, req) => {
	try {
		if (query.category_id) {
			const response = await instance
				.get(`/categories/${query.category_id}?appends[]=total_ads_count&${accumulation.searchUrl}`);
			return response.data.category.children;
		} else {
			const response = await instance
				.get(`/categories?appends[]=total_ads_count&${accumulation.searchUrl}`);
			return response.data;
		}
	} catch (e) {
		console.log('categoriesTotal = ', e);
		throw e;
	}
};