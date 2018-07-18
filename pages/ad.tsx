import React from 'react';

import { withI18next } from '../common/lib/withI18next';

import Header from 'client/ssr/blocks/header/Header';
import Navbar from 'client/ssr/blocks/navbar/Navbar';
import Search from 'client/ssr/blocks/search/Search';
import Ad from 'client/ssr/blocks/ad/Ad';
import SellerModal from 'client/ssr/modals/seller/SellerModal';
import Footer from 'client/ssr/blocks/footer/Footer';
import 'isomorphic-fetch';
import { types } from 'redux-act';
import { IAd } from 'client/ssr/blocks/ad/interface'

const isServer: boolean = typeof window === 'undefined';

if (isServer) {
	types.disableChecking();
}

class Ads extends React.Component<IAd> {
	static async getInitialProps({ query }) {
		return { ad: query.ad };
	}

	render() {
		return (
			<React.Fragment>
				<Header />
				<div className='bottom-header p-y-20'>
					<div className='container'>
						<Navbar />
						<Search />
					</div>
				</div>
				<Ad ad={this.props.ad} />
				<SellerModal user={this.props.ad.user} />
				<Footer />
			</React.Fragment>
		);
	}
}

export default withI18next(['page2', 'common'])(Ads);