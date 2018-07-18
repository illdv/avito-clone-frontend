export interface IRoute {
	path: string;
	page: string;
	prepare: string[];
}

const routes = [
	{
		path: '/',
		page: '/index',
		prepare: ['ads'],
	},
	{
		path: '/ad/:id',
		page: '/ad',
		prepare: ['ad'],
	},
	{
		path: '/profile',
		page: '/profile',
	},
] as IRoute[];

export const getRoutes = () => routes;
