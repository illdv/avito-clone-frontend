const fs = require('fs');
const dotenv = require('dotenv');
const log4js = require('log4js');

const connectConfig = (path) =>
    fs.existsSync(path) // File validation
        ? process.env = { ...process.env, ...dotenv.parse(fs.readFileSync(path)) }
        : null;

connectConfig('.env');

log4js.configure({
    appenders: {
        out: { type: 'stdout', level: process.env.DISPLAYED_LOG_LEVEL },
        api: { type: 'file', filename: 'logs/api.log', maxLogSize: 10485760 },
        ssr: { type: 'file', filename: 'logs/ssr.log', maxLogSize: 10485760 },
        errorFile: { type: 'file', filename: 'logs/errors.log', maxLogSize: 10485760 },
        errors: { type: 'logLevelFilter', level: 'error', appender: 'errorFile' }
    },
    categories: {
        default: { appenders: ['out', 'errors'], level: 'trace' },
        server: { appenders: ['out', 'errors'], level: 'trace' },
        api: { appenders: ['api', 'out', 'errors'], level: 'trace' },
        ssr: { appenders: ['ssr', 'out', 'errors'], level: 'trace'}
    }
});

require('./server/root');