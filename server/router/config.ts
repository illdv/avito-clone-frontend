export interface IRoute {
	path: string;
	page: string;
	prepare: string[];
}

const routes = [
	{
		path: '/',
		page: '/index',
		prepare: ['location', 'ads', 'categories'],
	},
	{
		path: '/ad/:id',
		page: '/ad',
		prepare: ['location', 'ad', 'categories'],
	},
	{
		path: '/profile*',
		page: '/profile',
		prepare: ['location', 'categories'],
	},
	{
		path: '/favorites',
		page: '/favorites',
		prepare: ['location'],
	},
	{
		path: '/category/:categorySlug?',
		page: '/category',
		prepare: ['location', 'category'],
	},
	{
		path: '/search',
		page: '/search',
		prepare: ['location', 'categories', 'search', 'query'],
	},
] as IRoute[];

export const getRoutes = () => routes;
