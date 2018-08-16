export interface IAttachedImage {
	id?: number;
	isBackend: boolean;
	base64: string;
	file?: any;
}

export enum AdInfoFieldsNames {
	title = 'title',
	price = 'price',
	description = 'description',
	address = 'address',
	city_id = 'city_id',
}

export interface IField {
	disable: boolean;
	value: string;
	error: string;
}

export interface INumberField {
	value: number;
	error: string;
}

export interface IAdInfoFields {
	[AdInfoFieldsNames.title]: IField;
	[AdInfoFieldsNames.price]: IField;
	[AdInfoFieldsNames.description]: IField;
	[AdInfoFieldsNames.address]: IField;
	[AdInfoFieldsNames.city_id]: INumberField;
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