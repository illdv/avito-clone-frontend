export interface IRoute {
	path: string;
	page: string;
	prepare: string[];
}

const routes = [
	{
		path: '/',
		page: '/index',
		prepare: ['ads', 'categories'],
	},
	{
		path: '/ad/:id',
		page: '/ad',
		prepare: ['ad', 'categories'],
	},
	{
		path: '/profile',
		page: '/profile',
	},
	{
		path: '/favorites',
		page: '/favorites',
	},
	{
		path: '/category/:categorySlug?',
		page: '/category',
		prepare: ['category', 'categories'],
	},
] as IRoute[];

export const getRoutes = () => routes;
