export interface IRoute {
	path: string;
	page: string;
	prepare: string[];
}

export const getRoutes = () => ([
	{
		path: '/',
		page: '/index',
		prepare: ['adsPaginationPage', 'categories', 'categoriesByLocation'],
	},
	{
		path: '/ad/:id',
		page: '/ad',
		prepare: ['adForShow', 'categories'],
	},
	{
		path: '/profile*',
		page: '/profile',
		prepare: ['categories'],
	},
	{
		path: '/favorites',
		page: '/favorites',
		prepare: ['location'],
	},
	{
		path: '/search',
		page: '/search',
		prepare: ['searchUrl', 'categories', 'search', 'countriesTotal', 'categoriesTotal'],
	},
] as IRoute[]);

export const getCommonPrepares = () => (['location', 'query']);