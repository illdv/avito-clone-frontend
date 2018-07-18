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
import { IAds } from 'client/ssr/blocks/list-of-ads/entries/ads/interface';

const isServer: boolean = typeof window === 'undefined';

if (isServer) {
    types.disableChecking();
}

interface IIndexProps {
    t: any;
    ads: IAds[];
}

export class Index extends React.Component<IIndexProps> {
    state = {
        categories: ['cars', 'girls']
    }
    static async getInitialProps({ query }) {
        return { ads: query.ads };
    }

    render() {
        return (
            <React.Fragment>
                <CategoriesProvider categories={categories}>
                <Head>
                    <meta
                        property="og:description"
                        content='Content'
                    />
                    <title>Index page</title>
                </Head>
                <Header />
                <div className="header_bottom p-y-20">
                    <div className="container">
                        <Navbar />
                        <Search />
                    </div>
                </div>
                    <Categories />
                <ListOfAds
                    title='Vip ads'
                    ads={this.props.ads}
                />
                <ListOfAds
                    title='Houses, villas, cottages'
                    ads={this.props.ads}
                />
                <Footer />
                <ToastContainer />
                </CategoriesProvider>
            </React.Fragment>
        );
    }
}

export default withI18next(['home', 'common'])(Index);
