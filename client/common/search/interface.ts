export interface IQuery {
	category_id?: number;
	country_id?: number;
	region_id?: number;
	city_id?: number;
	price_from?: object;
	search?: string;
	currentPage?: number;
	options?: any;
	type?: number;
	whereBetween?: {
		'price[0]': number | null,
		'price[1]': number | null,
	};
	whereLike?: {
		body: string,
		description: string,
		title: string,
	};
}