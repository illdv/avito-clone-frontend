import { Images } from 'client/spa/pages/createAd/ImageSelector';

export interface IType {
	id: number;
	name: string;
	slug: string;
	created_at: string;
	updated_at: string;
	deleted_at?: any;
}

export interface Image {
	id: number;
	imageable_type: string;
	imageable_id: number;
	file_name: string;
	file: string;
	created_at: string;
	updated_at: string;
	file_url: string;
}

export interface IAds {
	id: string;
	type_id: number;
	category_id: string;
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
	city_id: number;
	type?: IType;
	options?: any[];
	latitude?: number;
	longitude?: number;
	phone?: string;
	images?: Image[];
}

export interface ICreateAdRequest {
	title: string;
	description: string;
	city_id: number;
	body: string;
	type_id: number;
	price: string;
	longitude: number;
	latitude: number;
	category_id: string;
	is_published: number;
	is_vip: number;
	phone: string;
	images: Images[];
}