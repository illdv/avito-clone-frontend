import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    static async getInitialProps (ctx) {
        return await Document.getInitialProps(ctx)
    }

    render() {
        return (
            <html>
            <Head>
                <title>Avito clone</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>

                <link rel="stylesheet" href="/static/css/sanitize.css"/>
                <link rel="stylesheet" href="/_next/static/style.css"/>

                <link rel="shortcut icon" type="image/x-icon" href="/static/assets/images/favicon.png"/>
            </Head>
            <body>
                <Main />
                <NextScript />
                <script type="text/javascript" src="/static/js/main.js" />
            </body>
            </html>
        );
    }
}