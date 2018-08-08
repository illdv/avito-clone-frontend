import { default as axios } from 'axios';
import * as queryString from 'query-string';

import {
	categoryQueueToBreadcrumbsFormat,
	findCategoriesQueueById,
	findCategoriesQueueBySlug,
	getCurrentCategoryByQueue,
	getIdFromCategory,
	getLocationNameByLocations,
	getLocationsIdByRequest,
	getMainCategory,
	getSubcategoryByCategoryQueue,
} from '../utils/categoryPrepare';

import { getDataForAdShowPage, getDataForAdsIndexPage } from '../api/ad';
import { getLitleCategories } from '../api/category';

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

export const formatData = (data): string => {
	return queryString.stringify(data, { arrayFormat: 'bracket' });
};

export const adsPaginationPage: prepareMethod = async () => {
	try {
		const response = await instance.get(`/ads?${formatData(getDataForAdsIndexPage)}`);
		const ads      = response.data.data;
		const vip      = response.data.vip;
		return { ads, vip };
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

const getLiteAdsByQueryString = async (queryString: string) => {
	const response = await instance.get(`/ads/?${ queryString }`);
	return response.data;
};

export const location: prepareMethod = async (sugar, req) => {
	/* const ip = req.clientIp;

	if (req.session.location) {
		return req.session.location;
	}

	if (req.session.location === void 0) { // First request
		try {
			const location = await iplocation(ip);
		   return undefined;
		} catch (err) {
			return undefined;
		}
	} else {
		return req.session.location;
	} */

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

// export const vipAds: prepareMethod = async ({ params, query, path }, req) => {
// 	const data = formatData(getDataForAdsIndexPage);
// 	const vipAdsResponse = await getLiteAdsByQueryString({data, vip: 1, count: 8 });
// 	console.log(vipAdsResponse);
// 	return vipAdsResponse.data;
// };

export const category: prepareMethod = async ({ params, query, path }, req) => {
	const { categorySlug }                = params;
	const { idCountry, idRegion, idCity } = getLocationsIdByRequest(req);

	/*
	let paramsForReqCategory = null;

	if (idCity) {
		paramsForReqCategory = { city_id: idCity };
	} else if (idRegion) {
		paramsForReqCategory = { region_id: idRegion };
	} else if (idCountry) {
		paramsForReqCategory = { country_id: idCountry };
	}

	 const { data: categories } = paramsForReqCategory
		? await instance.get(`/categories/?${ queryString.stringify(paramsForReqCategory) }`)
		: await instance.get('/categories');
		*/

	const { data: categories } = await instance.get('/categories');

	try {
		const categoryQueue   = findCategoriesQueueBySlug(categories, categorySlug);
		const breadcrumbs     = categoryQueueToBreadcrumbsFormat(categoryQueue);
		const currentCategory = getCurrentCategoryByQueue(categoryQueue);
		const mainCategory    = getMainCategory(categoryQueue);
		const mainCategoryId  = getIdFromCategory(mainCategory);

		let subcategories = [];
		const adGroupList = [];

		const reqForVipAds: any = { vip: 1, count: 4 };

		if (currentCategory) {
			reqForVipAds.category = currentCategory.id;
			subcategories         = subcategories.concat(getSubcategoryByCategoryQueue(categoryQueue));
		} else {
			subcategories = subcategories.concat(categories);
		}

		const vipAds = await getLiteAdsByQueryString(reqForVipAds);

		if (vipAds.data.length > 0) {
			adGroupList.push({
				id: 999999999999999, // TODO - Need fix
				title: 'Vip ads',
				ads: vipAds.data,
			});
		}

		if (currentCategory) {
			if (subcategories && subcategories.length > 0) {
				subcategories.forEach(subcategory => {
					if (subcategory.ads.length > 0) {
						adGroupList.push({
							title: subcategory.title,
							ads: subcategory.ads,
						});
					}
				});
			} else {
				if (currentCategory && currentCategory.ads.length > 0) {
					adGroupList.push({
						id: currentCategory.id,
						title: currentCategory.title,
						ads: currentCategory.ads,
					});
				}
			}
		} else {
			const ads = await getLiteAdsByQueryString('');

			if (ads.data.length > 0) {
				adGroupList.push({
					title: 'All ads',
					ads: ads.data,
				});
			}
		}

		return {
			categories,
			breadcrumbs,
			mainCategoryId,
			mainCategory,
			subcategories,
			adGroupList,
		};
	} catch (err) {
		console.log(err);
		return { categories, breadcrumbs: [], subcategory: [] };
	}
};

const getInstanseWithLanguageByReq = req => {
	return axios.create({
		baseURL: process.env.API_FOR_LOCATION,
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Accept-Language': req.headers['accept-language'],
		},
	});
};

export const getCountries: prepareMethod = async (sugar, req) => {
	try {
		const response = await getInstanseWithLanguageByReq(req).get('/countries');
		return response.data;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const getRegions: prepareMethod = async ({ query }, req) => {
	try {
		const response = await getInstanseWithLanguageByReq(req).get(`/countries/${query.id}/regions/%20`);
		return response.data;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const getCities: prepareMethod = async ({ query }, req) => {
	try {
		const response = await getInstanseWithLanguageByReq(req).get(`/regions/${query.id}/cities/%20`);
		return response.data;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export const search: prepareMethod = async ({ query = {}, accumulation }, req) => {
	try {
		const url = formatData({
			...getDataForAdsIndexPage,
			...(accumulation.query || query),
		}) + '&page=' + query.currentPage;

		const response     = await getLiteAdsByQueryString(url);
		console.log('Search url = ', url);
		console.log('Search response', response);

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
		console.log('err', err);
		return [];
	}
};

export const breadcrumbs: prepareMethod = async ({ query, accumulation }, req) => {
	const categoryQueue = findCategoriesQueueById(accumulation.categories, query.category);
	return [
		{
			title: `All listings in ${accumulation.location.locationName}`,
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
			const responseRegions = await getInstanseWithLanguageByReq(req)
				.get(`/regions/${queryParams.region_id}/cities?appends[]=total_ads&category_id=${queryParams.category_id}`);
			return responseRegions.data;
		}

		if (hasCountry && !hasCity) {
			const responseRegions = await getInstanseWithLanguageByReq(req)
				.get(`/countries/${queryParams.country_id}/regions?appends[]=total_ads&category_id=${queryParams.category_id}`);
			return responseRegions.data;
		}

		const responseCountries = await getInstanseWithLanguageByReq(req)
			.get(`/countries?appends[]=total_ads&category_id=${queryParams.category_id}`);
		return responseCountries.data;
	} catch (e) {
		return [];
	}
};

export const categoriesTotal: prepareMethod = async ({ query, accumulation }, req) => {
	try {
		const response = await instance.get(`/categories/${query.category_id}?appends[]=total_ads_count`);
		return response.data.category.children;
	} catch (e) {
		return [];
	}
};