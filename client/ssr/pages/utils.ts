import { ItemOfTitlesList } from 'client/ssr/blocks/list-of-subcategories/ListOfSubcategories';
import { ICountriesTotal } from 'client/ssr/pages/Search';
import { getQueryLoop } from 'client/ssr/contexts/QueryContext';
import * as queryString from 'querystring';

export const categoryToItemOfTitlesList = ({ id, title, total_ads_count, slug }: ICategory): ItemOfTitlesList => {
	const query  = getQueryLoop();
	const parsed = queryString.stringify({ ...query, category_id: id });
	return { id, title, count: total_ads_count, href: `?${parsed}` };
};

function getNewWhereLike() {
	const newQueryParams: any = { ...getQueryLoop() };
	const queryData           = {};

	if (newQueryParams && newQueryParams.whereLike) {
		queryData['whereLike[title]']       = newQueryParams.whereLike.title;
		queryData['whereLike[body]']        = newQueryParams.whereLike.body;
		queryData['whereLike[description]'] = newQueryParams.whereLike.description;
	}

	return `&${queryString.stringify(queryData)}`;
}

// TODO: Rename method to locationToItemOfTitlesList
export const countriesToItemOfTitlesList = (countriesTotal: ICountriesTotal): ItemOfTitlesList => {
	const { country_id, region_id, city_id, title, total_ads } = countriesTotal;

	const href = `?${calcUrlSearchForLocation(country_id, region_id, city_id)}` + getNewWhereLike();
	return {
		id: city_id || region_id || country_id,
		title,
		count: total_ads,
		href,
	};
};

function calcUrlSearchForLocation(countryId, regionId, cityId) {
	const newQueryParams: any = { ...getQueryLoop() };
	delete newQueryParams.whereLike;

	const hasRegion  = newQueryParams.region_id;
	const hasCountry = newQueryParams.country_id;
	const hasCity    = newQueryParams.city_id;

	if (hasRegion && !hasCity) {
		return queryString.stringify({ ...newQueryParams, city_id: cityId });
	}

	if (hasCountry && !hasCity) {
		delete newQueryParams.city_id;
		return queryString.stringify({ ...newQueryParams, region_id: regionId });
	}

	delete newQueryParams.city_id;
	delete newQueryParams.region_id;

	return queryString.stringify({ ...newQueryParams, country_id: countryId });
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

	const hasRegion  = newQueryParams.region_id;
	const hasCountry = newQueryParams.country_id;
	const hasCity    = newQueryParams.city_id;

	return {
		hasRegion,
		hasCountry,
		hasCity,
	};
}

function getLocationType(): LocationType {
	const { hasCity, hasCountry, hasRegion } = getLocationStatus();
	if (hasCountry && hasRegion && hasCity) {
		return LocationType.SelectCity;
	}

	if (hasCountry && hasRegion) {
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