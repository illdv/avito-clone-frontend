import { ItemOfTitlesList } from 'client/ssr/blocks/list-of-subcategories/ListOfSubcategories';

export const categoryToItemOfTitlesList = ({ id, title, total_ads_count, slug }: ICategory): ItemOfTitlesList => {
	return { id, title, count: total_ads_count, href: `/category/${ slug }` };
};