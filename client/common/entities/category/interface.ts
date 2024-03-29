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
	id: number;
	title: string;
	slug: string;
	description: string;
	parent_id: string;
	total_ads_count: number;
	children: ICategory[];
	ads_count?: number;
	total_options: ITotalOptions[];
}

interface ISelectedCategoriesError {
	category: string;
	subCategory: string;
}

interface ITotalOptions {
	id: number;
	category_id: number;
	type_id: number;
	name: string;
	ctrated_at: string;
}

interface ICategories {
	[key: number]: ICategory;
}