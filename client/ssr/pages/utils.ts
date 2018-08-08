import { ItemOfTitlesList } from 'client/ssr/blocks/list-of-subcategories/ListOfSubcategories';
import { ICountriesTotal } from 'client/ssr/pages/Search';
import { getQueryLoop } from 'client/ssr/contexts/QueryContext';
import * as queryString from 'querystring';

export const categoryToItemOfTitlesList = ({ id, title, total_ads_count, slug }: ICategory): ItemOfTitlesList => {
	const query  = getQueryLoop();
	const parsed = queryString.stringify({ ...query, category_id: id });
	return { id, title, count: total_ads_count, href: `?${parsed}` };
};

// TODO: Rename method to locationToItemOfTitlesList
export const countriesToItemOfTitlesList = (countriesTotal: ICountriesTotal): ItemOfTitlesList => {
	const { country_id, region_id, city_id, title, total_ads } = countriesTotal;

	return {
		id: country_id, title,
		count: total_ads,
		href: `?${calcUrlSearchForLocation(country_id, region_id, city_id)}`,
	};
};

function calcUrlSearchForLocation(countryId, regionId, cityId) {
	const newQueryParams = { ...getQueryLoop() };

	const hasRegion = newQueryParams.region_id;
	const hasCountry = newQueryParams.country_id;
	const hasCity = newQueryParams.city_id;

	if (hasRegion && !hasCity) {
		return queryString.stringify({ ...newQueryParams, city_id: cityId });

	}

	if (hasCountry && !hasCity) {
		delete newQueryParams.city_id;
		return queryString.stringify({ ...newQueryParams, region_id: regionId });
	}

	delete newQueryParams.city_id;
	delete newQueryParams.region_id;
	console.log('newQueryParams', newQueryParams);
	return queryString.stringify({ ...newQueryParams, country_id: countryId });
}