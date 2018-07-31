import { ITotalOptions } from '../../../common/categories/interface';

export interface IAttachedImage {
	id?: string;
	isBackend: boolean;
	base64: string;
	file?: any;
}

export enum AdInfoFieldsNames {
	title = 'title',
	price = 'price',
	description = 'description',
}

export interface IField {
	disable: boolean;
	value: string;
}

export interface IAdInfoFields {
	[AdInfoFieldsNames.title]: IField;
	[AdInfoFieldsNames.price]: IField;
	[AdInfoFieldsNames.description]: IField;
}

export enum SellerFieldsNames {
	name = 'name',
	email = 'email',
	phone = 'phone',
}

export interface ISellerInfoFields {
	[SellerFieldsNames.name]: IField;
	[SellerFieldsNames.email]: IField;
	[SellerFieldsNames.phone]: IField;
}

export interface ILocation {
	id: number;
	name: string;
	lat: number;
	lng: number;
}

export interface IOption {
	value: string;
	item: ITotalOptions;
}