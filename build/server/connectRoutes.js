import prepares from './prepareDataForRoute';
import routes from './routes';
const initialRoutes = (server, appNext, handleNext) => {
    const config = routes;
    config.ssr.forEach((route) => {
        server.get(route.path, async (req, res) => {
            const { path, params } = req; // Express sugar
            const prepareResult = await [].concat(route.prepare || []).reduce(async (acc, prepareName) => {
                try {
                    if (!(prepares[prepareName] instanceof Function)) {
                        throw new Error(`Prepare [${prepareName}] is not function`);
                    }
                    acc[prepareName] = await prepares[prepareName](path, params);
                    return acc;
                }
                catch (error) {
                    console.error(error);
                    throw error;
                }
            }, {});
            appNext.render(req, res, route.page, prepareResult); // Render ssr page
        });
    });
};
export default initialRoutes;
//# sourceMappingURL=connectRoutes.js.map