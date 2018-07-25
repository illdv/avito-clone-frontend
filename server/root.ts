import * as i18nextMiddleware from 'i18next-express-middleware';
import * as Backend from 'i18next-node-fs-backend';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as requestIp from 'request-ip';
import * as express from 'express';
import * as log4js from 'log4js';
import * as path from 'path';
import * as next from 'next';

import { i18nInstance } from '../common/lib/i18n';
import { initialRoutes } from './router/connectRoutes';

const dev = process.env.NODE_ENV !== 'production';
const appNext = next({ dev });
const handleNext = appNext.getRequestHandler();


// Logers
const serverLogger = log4js.getLogger('server');
//const defaultLogger = log4js.getLogger();

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
        
                server.enable('trust proxy');

                server.use(requestIp.mw());

                server.use(session({
                    secret: 'keyboard cat',
                    resave: false,
                    saveUninitialized: true,
                    cookie: { secure: true }
                }))
		
				server.use(bodyParser.urlencoded({ extended: false }));
				server.use(bodyParser.json());
				// enable middleware for i18next
				server.use(i18nextMiddleware.handle(i18nInstance));

				// serve locales for client
				server.use('/locales', express.static(path.join(__dirname, '../common/locales')));

				// missing keys
				server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18nInstance));

				initialRoutes(server, appNext);

				// use next.js
				server.get('*', (req, res) => handleNext(req, res));

				server.listen(process.env.PORT, (err) => {
					if (err) throw err;
					serverLogger.trace(`Listen in ${process.env.PORT} port`);
				})
			})
	})
