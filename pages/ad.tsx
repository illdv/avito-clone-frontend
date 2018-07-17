import React from 'react';
import thunk from 'redux-thunk';
import axios from 'axios';

import { withI18next } from '../common/lib/withI18next';

import Header from '../src/ssr/blocks/header/Header';
import Navbar from '../src/ssr/blocks/navbar/Navbar';
import Search from '../src/ssr/blocks/search/Search';
import Ad from '../src/ssr/blocks/ad/Ad';
import SellerModal from 'src/ssr/modals/seller/SellerModal';
import Footer from 'src/ssr/blocks/footer/Footer';
import { types } from 'redux-act'

const isServer: boolean = typeof window === 'undefined';

if (isServer){
    types.disableChecking();
}

interface  AdsProps {
				user: {
				    name: string
    }
}

class Ads extends React.Component<AdsProps> {
	static async getInitialProps(){
		return axios.get('api/client/v1/ads/2')
      .then((response) => {console.log(response)});
	}

	render(){
		return (
			<React.Fragment>
				<Header />
				<div className="bottom-header p-y-20">
        			<div className="container">
						<Navbar />
						<Search />
					</div>
				</div>
				<Ad />
							<SellerModal user={ this.props.user }/>
				<Footer/>
			</React.Fragment>
		)
	}
}

export default withI18next(['page2', 'common'])(Ads);