const withTs = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const Dotenv = require('dotenv-webpack');

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

        const dev = process.env.NODE_ENV !== 'production';

        if (dev)
            config.devtool = 'source-map';

        return config;
    }
}));