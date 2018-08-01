interface IRequestCreateCategory {
	title: string;
	description: string;
	parent_id: string;
}

interface IResponseCategories {
	[key: number]: {
		title: string;
		description: string;
		parent_id: string;
	};
}

interface ICategory {
	id: string;
	title: string;
	slug: string;
	description: string;
	parent_id: string;
	total_ads_count: number;
	children: ICategory[];
	total_options: ITotalOptions[];
}

interface ITotalOptions {
	id: number;
	category_id: number;
	type_id: number;
	name: number;
}

interface ICategories {
	[key: number]: ICategory;
}