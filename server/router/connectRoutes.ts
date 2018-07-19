import * as prepares from './prepares';
import { IRoute, getRoutes } from './config';

export const initialRoutes = (server, appNext) => {
    getRoutes().forEach((route: IRoute) => {

        server.get(route.path, async (req, res) => {
            const { path, params } = req; // Express sugar
            const formatPepares = [].concat(route.prepare || []);

            const prepareResult = await formatPepares.reduce(async (accPromise: object, prepareName: string) => {
                const acc = await accPromise;
                try {
                    if (!(prepares[prepareName] instanceof Function)) {
                        throw new Error(`Prepare [${ prepareName }] is not function`);
                    }

                    acc[prepareName] = await prepares[prepareName](path, params);
                    return acc;
                } catch (error) {
                    throw error;
                }
            }, Promise.resolve({}));

            appNext.render(req, res, route.page, prepareResult); // Render ssr page

        });
    });
};
