export interface IRequestCreateCategory {
	title: string;
	description: string;
	parent_id: string;
}

export interface IResponseCategories {
	[key: number]: {
		title: string;
		description: string;
		parent_id: string;
	};
}

export interface ICategory {
	id: string;
	title: string;
	slug: string;
	description: string;
	parent_id: string;
	total_ads_count: number;
	children: ICategory[];
	total_options: ITotalOptions[];
}

export interface ITotalOptions {
	id: number;
	category_id: number;
	type_id: number;
	name: string;
}

export interface ICategories {
	[key: number]: ICategory;
}