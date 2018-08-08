import { ItemOfTitlesList } from 'client/ssr/blocks/list-of-subcategories/ListOfSubcategories';
import { ICountriesTotal } from 'client/ssr/pages/Search';
import { getQuery, getQueryLoop } from 'client/ssr/pages/QueryContext';
import * as queryString from 'querystring';

export const categoryToItemOfTitlesList = ({ id, title, total_ads_count, slug }: ICategory): ItemOfTitlesList => {
	return { id, title, count: total_ads_count, href: `/category/${ slug }` };
};

export const countriesToItemOfTitlesList = ({ country_id, title, total_ads }: ICountriesTotal): ItemOfTitlesList => {
	const query = getQueryLoop();
	console.log('Query = ', query);
	delete query.city_id;
	const parsed = queryString.stringify({...query, country_id});
	console.log('Parsed = ', parsed);
	return { id: country_id, title, count: total_ads, href: `?${parsed}` };
};