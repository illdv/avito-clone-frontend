const express = require('express');
const log4js = require('log4js');
const path = require('path');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const appNext = next({ dev });
const handleNext = appNext.getRequestHandler();

const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-node-fs-backend');
const { i18nInstance } = require('../i18n');

const handlerRoutes = require('./handlerRoutes');

// Logers
const serverLogger = log4js.getLogger('server');
const defaultLogger = log4js.getLogger();

// init i18next with serverside settings
// using i18next-express-middleware
i18nInstance
	.use(Backend)
	.use(i18nextMiddleware.LanguageDetector)
	.init({
		fallbackLng: 'en',
		preload: ['en', 'de'], // preload all langages
		ns: ['common', 'home', 'page2'], // need to preload all the namespaces
		backend: {
			loadPath: path.join(__dirname, '../common/locales/{{lng}}/{{ns}}.json'),
			addPath: path.join(__dirname, '../common/locales/{{lng}}/{{ns}}.missing.json')
		}
	}, () => {
		// loaded translations we can bootstrap our routes
		appNext.prepare()
			.then(() => {
				const server = express();

				// enable middleware for i18next
				server.use(i18nextMiddleware.handle(i18nInstance));

				// serve locales for client
				server.use('/locales', express.static(path.join(__dirname, '../common/locales')));

				// missing keys
				server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18nInstance));

				handlerRoutes(server, appNext, handleNext);

				// use next.js
				server.get('*', (req, res) => handleNext(req, res));

				server.listen(process.env.PORT, (err) => {
					if (err) throw err;
					serverLogger.trace(`Listen in ${process.env.PORT} port`);
				})
			})
	})
