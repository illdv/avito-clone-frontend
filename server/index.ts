import { existsSync, readFileSync } from 'fs';
import { configure } from 'log4js';
import * as dotenv from 'dotenv';

const connectConfig = path =>
	existsSync(path) // File validation
		? process.env = { ...process.env, ...dotenv.parse(readFileSync(path)) }
		: null;

connectConfig('.env');

configure({
	appenders: {
		out: { type: 'stdout', level: process.env.DISPLAYED_LOG_LEVEL },
		api: { type: 'file', filename: 'server/logs/api.log', maxLogSize: 10485760 },
		ssr: { type: 'file', filename: 'server/logs/ssr.log', maxLogSize: 10485760 },
		errorFile: { type: 'file', filename: 'server/logs/errors.log', maxLogSize: 10485760 },
		errors: { type: 'logLevelFilter', level: 'error', appender: 'errorFile' },
	},
	categories: {
		default: { appenders: ['out', 'errors'], level: 'trace' },
		server: { appenders: ['out', 'errors'], level: 'trace' },
		api: { appenders: ['api', 'out', 'errors'], level: 'trace' },
		ssr: { appenders: ['ssr', 'out', 'errors'], level: 'trace' },
	},
});

require('./root');