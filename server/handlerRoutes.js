const fs = require('fs');
const path = require('path');

const prepares = require('./prepareDataForRoute');

const initialRoutes = (server, appNext, handleNext) => {

    const configJson = fs.readFileSync(path.join(__dirname, '../routes.json'), 'utf-8');
    const config = JSON.parse(configJson);

    Object.keys(config.ssr).forEach(path => {
        const configForPath = config.ssr[path];

        server.get(path, async (req, res) => {
            const { path, params } = req;// Express sugar

            const prepareResult = await [].concat(configForPath.prepare).reduce(async (acc, prepareName) => {
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

            appNext.render(req, res, configForPath.page, prepareResult);// Render ssr page

        })
    })
}

module.exports = initialRoutes;