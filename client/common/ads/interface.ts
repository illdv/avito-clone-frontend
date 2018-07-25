export interface IPivot {
	ad_id: number;
	option_id: number;
	value: string;
}

export interface IType {
	id: number;
	name: string;
	slug: string;
	created_at: string;
	updated_at: string;
	deleted_at?: any;
}

export interface IAds {
	id: string;
	type_id: number;
	category_id: number;
	title: string;
	description: string;
	body: string;
	price: string;
	is_published?: number;
	is_approved?: number;
	is_active?: number;
	is_completed?: number;
	is_vip: number;
	created_at?: string;
	updated_at?: string;
	deleted_at?: any;
	pivot: IPivot;
	city_id: number;
	type?: IType;
	options?: any[];
	latitude?: number;
	longitude?: number;
}

export interface ICreateAdRequest {
	title: string;
	description: string;
	city_id: string;
	body: string;
	type_id: number;
	price: number;
	longitude: number;
	latitude: number;
	category_id: number;
	is_published: number;
	is_vip: number;
}
export interface IFavoritesAds {
	(id: any): IAds;
}