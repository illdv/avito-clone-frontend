import * as prepares from './prepares';
import { IRoute, getRoutes } from './config';

export const initialRoutes = (server, appNext) => {
	getRoutes().forEach((route: IRoute) => {

		server.get(route.path, async (req, res) => {
			const { params, query, path } = req; // Express sugar
			const formatPepares = [].concat(route.prepare || []);

			const prepareResult = await formatPepares.reduce(async (accPromise: object, prepareName: string) => {
				const acc = await accPromise;
				try {
					if (!(prepares[prepareName] instanceof Function)) {
						throw new Error(`Prepare [${ prepareName }] is not function`);
					}

					acc[prepareName] = await prepares[prepareName]({ params, query, path }, req);
					return acc;
				} catch (error) {
					throw error;
				}
			}, Promise.resolve({}));

			appNext.render(req, res, route.page, prepareResult); // Render ssr page
		});
	});

	server.post('/prepare', async (req, res) => {
        if (!req.body) {
            return res.status(400).json({ error: 'Query without body' });
        }

		const { prepareName, query, params, path } = req.body;

		if (!prepareName) {
			return res.status(400).json({ error: 'The query does not contain a prepareName' });
		}

		if (typeof prepareName !== 'string') {
			return res.status(400).json({ error: 'prepareName must be a string' });
		}
		
		if (!prepares[prepareName]) {
			res.status(400).json({ error: 'Prepare not found' });
		}

		try {
			const result = await prepares[prepareName]({ params, query, path }, req);
			res.status(200).json(result);
		} catch (error) {
			res.status(500).end();
		}
	});
};
