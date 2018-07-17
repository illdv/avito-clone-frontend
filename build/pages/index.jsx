import React from 'react';
import Head from 'next/head';
import { types } from 'redux-act';
import { withI18next } from '../common/lib/withI18next';
import Header from '../client/ssr/blocks/header/Header';
import Navbar from '../client/ssr/blocks/navbar/Navbar';
import Search from '../client/ssr/blocks/search/Search';
import Categories from '../client/ssr/blocks/categories/Categories';
import ListOfAds from '../client/ssr/blocks/list-of-ads/ListOfAds';
import Footer from '../client/ssr/blocks/footer/Footer';
import { ToastContainer } from 'react-toastify';
const isServer = typeof window === 'undefined';
if (isServer) {
    types.disableChecking();
}
export class Index extends React.Component {
    static async getInitialProps({ query }) {
        return { data: query.ads };
    }
    render() {
        return (<React.Fragment>
                <Head>
                    <meta property='og:description' content='Content'/>
                    <title>Index page</title>
                </Head>
                <Header />
                <div className='header_bottom p-y-20'>
                    <div className='container'>
                        <Navbar />
                        <Search />
                    </div>
                </div>
                <Categories />
                <ListOfAds title='Vip ads' ad={[]}/>
                <ListOfAds title='Houses, villas, cottages' ad={[]}/>
                <Footer />
                <ToastContainer />
            </React.Fragment>);
    }
}
export default withI18next(['home', 'common'])(Index);
//# sourceMappingURL=index.jsx.map