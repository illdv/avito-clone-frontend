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
import { IAd } from 'client/ssr/blocks/ad/interface';
import { SetCategories } from 'client/ssr/blocks/categories/context';
import { isServer } from 'client/common/utils/utils';
import Error from 'next/error';

if (isServer) {
	types.disableChecking();
}

interface IAdsProps {
	adForShow: {
		ad: IAd;
		similars: IAd[];
	};
	categories: any[];
}

class Ads extends React.Component<IAdsProps> {
	static async getInitialProps({ query }) {
		return {
			adForShow: query.adForShow,
			location: query.location,
			categories: query.categories,
		};
	}

	render() {
		if (!this.props.adForShow || !this.props.adForShow.ad) {
			return <Error statusCode={404} />;
		}
		const { categories, adForShow: {ad, similars} } = this.props;
		const { user, address } = ad;
		return (
			<React.Fragment>
				<SetCategories categories={categories}>
					<Header />
					<div className='bottom-header p-y-20'>
						<div className='container'>
							<Navbar />
							<Search priceRange={true}/>
						</div>
					</div>
					<Ad
						ad={ad}
						categories={categories}
						similar={similars}
					/>
					<SellerModal
						seller={user}
						address={address}
					/>
					<Footer />
				</SetCategories>
			</React.Fragment>
		);
	}
}

export default withI18next(['page2', 'common'])(Ads);