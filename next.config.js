const path = require('path');
const withTs = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const Dotenv = require('dotenv-webpack');

const clientPath = path.join(__dirname, './client');
const nextPreparesPath = path.join(__dirname, './next-prepares');

module.exports = withTs(withSass({
	webpack(config){
		config.plugins.push(new Dotenv({
			path: './.env',
			safe: false,
			systemvars: true
		}));
		config.module.loaders = (config.module.loaders || []).concat({
			test: /\.css$/, loader: 'raw'
		});

		config.resolve = {
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
			modules: ['node_modules', clientPath],
			alias: {
				'client': clientPath,
				'next-prepares': nextPreparesPath,
			},
		};

		const dev = process.env.NODE_ENV !== 'production';

		if (dev)
			config.devtool = 'source-map';

		return config;
	}
}));