export interface IRoute {
    path: string;
    page: string;
    prepare: string[];
}

const routes = [
    {
        path: '/',
        page: '/index',
        prepare: [ 'gg', 'ads' ],
    },
    {
        path: '/ad/:id',
        page: '/ad',
        prepare: [ 'ads' ],
    },
] as IRoute[];

export const getRoutes = () => routes;
