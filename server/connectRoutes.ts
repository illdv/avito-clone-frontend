import prepares from './prepareDataForRoute';
import routes, { IConfigRoutes, ISsrRoute } from './routes';

const initialRoutes = (server, appNext, handleNext) => {
    const config: IConfigRoutes = routes;

    config.ssr.forEach((route: ISsrRoute) => {

        server.get(route.path, async (req, res) => {
            const { path, params } = req;// Express sugar

            const prepareResult = await [].concat(route.prepare || []).reduce(async (acc: object, prepareName: string) => {
                try {
                    if (!(prepares[prepareName] instanceof Function)) {
                        throw new Error(`Prepare [${ prepareName }] is not function`);
                    }

                    acc[prepareName] = await prepares[prepareName](path, params);
                    return acc;
                } catch(error) {
                    console.error(error);
                    throw error;
                }
            }, {});

            appNext.render(req, res, route.page, prepareResult);// Render ssr page

        })
    })
}

export default initialRoutes;