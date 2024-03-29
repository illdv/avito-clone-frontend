import { ItemOfTitlesList } from 'client/ssr/blocks/list-of-subcategories/ListOfSubcategories';
import { ICountriesTotal } from 'client/ssr/pages/Search';
import { getQueryLoop } from 'client/ssr/contexts/QueryContext';
import { queryStringifyPlus } from '../../../server/router/utils';

export const categoryToItemOfTitlesList = ({ id, title, total_ads_count }: ICategory): ItemOfTitlesList => {
	const query  = getQueryLoop();
	const parsed = queryStringifyPlus({ ...query, category_id: id });
	return { id, title, count: total_ads_count, href: `?${parsed}` };
};

// TODO: Rename method to locationToItemOfTitlesList
export const countriesToItemOfTitlesList = (countriesTotal: ICountriesTotal): ItemOfTitlesList => {
	const { country_id, region_id, city_id, title, total_ads } = countriesTotal;

	const href = `?${calcUrlSearchForLocation(country_id, region_id, city_id)}&`;

	return {
		id: city_id || region_id || country_id,
		title,
		count: total_ads,
		href,
	};
};

function calcUrlSearchForLocation(countryId, regionId, cityId) {
	const newQueryParams: any = { ...getQueryLoop() };

	const hasRegion  = newQueryParams.region_id;
	const hasCountry = newQueryParams.country_id;
	const hasCity    = newQueryParams.city_id;

	delete newQueryParams.country_id;
	delete newQueryParams.region_id;
	delete newQueryParams.city_id;

	if (hasRegion && !hasCity) {
		return queryStringifyPlus({ ...newQueryParams, city_id: cityId });
	}

	if (hasCountry && !hasCity) {
		return queryStringifyPlus({ ...newQueryParams, region_id: regionId });
	}

	return queryStringifyPlus({ ...newQueryParams, country_id: countryId });
}

export interface ILocationStatus {
	hasCountry: boolean;
	hasRegion: boolean;
	hasCity: boolean;
}

export enum LocationType {
	SelectCountry,
	SelectRegion,
	SelectCity,
	NotSelectedLocation,
}

function getLocationStatus(): ILocationStatus {
	const newQueryParams: any = { ...getQueryLoop() };

	const hasRegion  = !!newQueryParams.region_id;
	const hasCountry = !!newQueryParams.country_id;
	const hasCity    = !!newQueryParams.city_id;

	return {
		hasRegion,
		hasCountry,
		hasCity,
	};
}

function getLocationType(): LocationType {
	const { hasCity, hasCountry, hasRegion } = getLocationStatus();

	if (hasCity) {
		return LocationType.SelectCity;
	}

	if (hasRegion) {
		return LocationType.SelectRegion;
	}

	if (hasCountry) {
		return LocationType.SelectCountry;
	}

	return LocationType.NotSelectedLocation;
}

export function getNextLocationName() {
	const locationStatus = getLocationType();
	switch (locationStatus) {
		case LocationType.SelectCountry:
			return 'Regions';
		case LocationType.SelectRegion:
			return 'Cities';
		case LocationType.SelectCity:
			return 'Countries';
		case LocationType.NotSelectedLocation:
			return 'Countries';
	}
}