import * as queryString from 'query-string';

function helper(nameObject, data) {
	return Object.entries(data).reduce((result, [key, value]) => {
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
	return queryString.stringify(reducerObject(data), { arrayFormat: 'bracket' });
}
