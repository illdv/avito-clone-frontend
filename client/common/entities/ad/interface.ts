interface IPivot {
	ad_id: number;
	option_id: number;
	value: string;
}

interface IType {
	id: number;
	name: string;
	slug: string;
	created_at: string;
	updated_at: string;
	deleted_at?: any;
}

interface IImage {
	id: number;
	imageable_type: string;
	imageable_id: number;
	file_name: string;
	file: string;
	created_at: string;
	updated_at: string;
	file_url: string;
}

interface IAd {
	id: number;
	type_id: number;
	category_id: number;
	title: string;
	description: string;
	body: string;
	price: string;
	city_id: number;
	is_published?: boolean;
	is_approved?: boolean;
	is_active?: boolean;
	is_completed?: boolean;
	is_vip?: boolean;
	created_at?: string;
	updated_at?: string;
	deleted_at?: any;
	pivot?: IPivot;
	type?: IType;
	options?: any[];
	latitude?: number;
	longitude?: number;
	phone?: string;
	images?: IImage[];
}

interface IAdsObject {
	[key: number]: IAd;
}