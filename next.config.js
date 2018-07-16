const path = require('path');6
const withTs = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const Dotenv = require('dotenv-webpack');

const sourcePath = path.join(__dirname, './src');

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
            modules: ['node_modules', sourcePath],
            alias: {
                src: sourcePath,
            },
        }

        const dev = process.env.NODE_ENV !== 'production';

        if (dev)
            config.devtool = 'source-map';

        return config;
    }
}));