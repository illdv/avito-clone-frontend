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

                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossOrigin="anonymous"/>
                <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic' rel='stylesheet' type='text/css'/>

                {/*<link rel="stylesheet" href="/static/css/sanitize.css"/>*/}
                <link rel="stylesheet" href="/_next/static/style.css"/>

                <link rel="shortcut icon" type="image/x-icon" href="/static/assets/images/favicon.png"/>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
            </html>
        );
    }
}