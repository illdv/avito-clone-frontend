import * as queryString from 'query-string';

function helper(nameObject, data) {
	return Object.entries(data || {}).reduce((result, [key, value]) => {
		return { ...result, [`${nameObject}[${key}]`]: value };
	}, {});
}

function reducerObject(data) {
	const entries = Object.entries(data);

	return entries.reduce((result, [key, value]) => {
		if (typeof value === 'object' && !Array.isArray(value)) {
			return { ...result, ...helper(key, value) };
		}
		return { ...result, [key]: value };
	}, {});
}

export function queryStringifyPlus(data) {
	return queryString.stringify(reducerObject(data || {}), { arrayFormat: 'bracket' });
}

export const  getQueryWithLocation = req => {
	const query = {};
	if (req.cookies) {
		if (eval(req.cookies.idCity)) {
			query.city_id = req.cookies.idCity;
		} else if (eval(req.cookies.idRegion)) {
			query.region_id = req.cookies.idRegion;
		} else if (eval(req.cookies.idCountry)) {
			query.country_id = req.cookies.idCountry;
		}
	}
	return query;
};
