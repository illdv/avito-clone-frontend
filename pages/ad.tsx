import React from 'react';

import { withI18next } from '../common/lib/withI18next';

import Header from '../src/ssr/blocks/header/Header';
import Navbar from '../src/ssr/blocks/navbar/Navbar';
import Search from '../src/ssr/blocks/search/Search';
import Ad from '../src/ssr/blocks/ad/Ad';

class Ads extends React.Component {
	static async getInitialProps(){

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
			</React.Fragment>
		)
	}
}

export default withI18next(['page2', 'common'])(Ads);