export interface IPivot {
	ad_id: number;
	option_id: number;
	value: string;
}

export interface IAds {
	id: number;
	category_id: number;
	type_id: number;
	title: string;
	description: string;
	created_at: string;
	updated_at: string;
	deleted_at?: any;
	pivot: IPivot;
}