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
	title: string;
	description: string;
	parent_id: string;
	children: ICategory[];
	total_options: ITotalOptions[];
}

export interface ITotalOptions {
	id: number;
	category_id: number;
	type_id: number;
	name: number;
}

export interface ICategories {
	[key: number]: ICategory;
}