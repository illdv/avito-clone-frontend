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
import { IAds, ResponseWhitPagination } from 'src/ssr/blocks/list-of-ads/entries/ads/interface';
import { Toasts } from 'src/common/utils/Toasts';
import { AdsAPI } from 'api/AdsAPI';

const isServer: boolean = typeof window === 'undefined';

if (isServer) {
    types.disableChecking();
}

interface IIndexProps {
    t: any;
    data: IAds[];
}

export class Index extends React.Component<IIndexProps> {
    static async getInitialProps() {
        const axiosData: ResponseWhitPagination<IAds[]> = await AdsAPI.get();
        return axiosData.data.data;
    }

    render() {
        return (
            <React.Fragment>
                <Head>
                    <meta
                        property='og:description'
                        content='Content'
                    />
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
                <ListOfAds
                    title='Vip ads'
                    ad={[]}
                />
                <ListOfAds
                    title='Houses, villas, cottages'
                    ad={[]}
                />
                <Footer />
                <ToastContainer />
            </React.Fragment>
        );
    }
}

export default withI18next(['home', 'common'])(Index);
