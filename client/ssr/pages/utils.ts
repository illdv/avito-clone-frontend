import { ItemOfTitlesList } from 'client/ssr/blocks/list-of-subcategories/ListOfSubcategories';
import { ICountriesTotal } from 'client/ssr/pages/Search';
import { getQueryLoop } from 'client/ssr/contexts/QueryContext';
import * as queryString from 'querystring';

export const categoryToItemOfTitlesList = ({ id, title, total_ads_count, slug }: ICategory): ItemOfTitlesList => {
	const query  = getQueryLoop();
	const parsed = queryString.stringify({ ...query, category_id: id });
	return { id, title, count: total_ads_count, href: `?${parsed}` };
};

export const countriesToItemOfTitlesList = ({ country_id, title, total_ads }: ICountriesTotal): ItemOfTitlesList => {
	const query = getQueryLoop();
	delete query.city_id;
	const parsed = queryString.stringify({ ...query, country_id });
	return { id: country_id, title, count: total_ads, href: `?${parsed}` };
};