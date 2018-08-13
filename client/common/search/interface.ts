export interface IQuery {
	category_id?: number;
	country_id?: number;
	region_id?: number;
	city_id?: number;
	price_from?: object;
	search?: string;
	currentPage?: number;
}