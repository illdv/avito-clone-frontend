import { IAttachedImage } from '../../../../../spa/profile/interfaces/managerAd';

export enum PageNames {
	Profile = 'Profile',
	Create  = 'Create',
	Confirm = 'Confirm',
	Edit    = 'Edit',
}

export enum MyAdsStatus {
	Disapproved = 'Disapproved',
	Active      = 'Active',
	Completed   = 'Completed',
}

export enum AdsActionType {
	Approve    = 'approve',
	Disapprove = 'disapprove',
	Activate   = 'activate',
	Deactivate = 'deactivate',
	Complete   = 'complete',
	Uncomplete = 'uncomplete',
}

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

export interface Image {
	id: string;
	imageable_type: string;
	imageable_id: number;
	file_name: string;
	file: string;
	created_at: string;
	updated_at: string;
	file_url: string;
}

export interface IOption {
	category_id: number;
	created_at: string;
	deleted_at: string|null;
	id: number;
	name: string;
	pivot: IPivot;
	type_id: number;
	updated_at: string;
}

export interface IOptionValue {
	id: number;
	value: string;
}

export interface IAds {
	id: string;
	type_id: number;
	category_id: string;
	title: string;
	description: string;
	address: string;
	body: string;
	price: string;
	is_published?: boolean;
	is_approved?: boolean;
	is_active?: boolean;
	is_completed?: boolean;
	is_vip?: boolean;
	created_at?: string;
	updated_at?: string;
	deleted_at?: any;
	pivot?: IPivot;
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
	category_id: number;
	phone: string;
	address: string;
	images: IAttachedImage[];
	options: IOptionValue[];
	is_vip: number;
}

export interface IEditAdRequest {
	ad_id: string;
	title: string;
	description: string;
	body: string;
	type_id: number;
	city_id: number;
	category_id: number;
	price: string;
	longitude: number;
	latitude: number;
	phone: string;
	images: IAttachedImage[];
	options: IOptionValue[];
	is_vip: number;
	address: string;
}

export interface IFavoritesAds {
	(id: any): IAds;
}