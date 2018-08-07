export interface IRoute {
	path: string;
	page: string;
	prepare: string[];
}

export const getRoutes = () => ([
	{
		path: '/',
		page: '/index',
		prepare: ['ads', 'categories', 'vipAds'],
	},
	{
		path: '/ad/:id',
		page: '/ad',
		prepare: ['ad', 'categories'],
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
		path: '/category/:categorySlug?',
		page: '/category',
		prepare: ['category'],
	},
	{
		path: '/search',
		page: '/search',
		prepare: ['categories', 'search', 'query'],
	},
] as IRoute[]);

export const getCommonPrepares = () => (['location']);