import Cookies from 'js-cookie';

export function isServer(): boolean {
	return typeof window === 'undefined';
}

export function pushInRouter(href: string) {
	window.location.href = href;
}

export const  getQueryWithLocation = () => {
	const query = {};

	if (eval(Cookies.get('idCity'))) {
		query.city_id = Cookies.get('idCity');
	} else if (eval(Cookies.get('idRegion'))) {
		query.region_id = Cookies.get('idRegion');
	} else if (eval(Cookies.get('idCountry'))) {
		query.country_id = Cookies.get('idCountry');
	}
	return query;
};