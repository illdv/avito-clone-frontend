import React from 'react';
import {IAds} from 'client/common/ads/interface';
import Ad from 'client/ssr/blocks/list-of-ads/components/Ad';

require('./ListOfAds.sass');

export {IAds};

export interface IAdsProps {
	title: string;
	ads: IAds[];
}

class Ads extends React.PureComponent<IAdsProps> {
	render() {
		const {ads, title} = this.props;

		return (
			<section className='section-sm'>
				<div className='container'>
					<div className='row'>
						<div className='col-12'>
							<h3 className='m-b-20'>{title}</h3>
						</div>
					</div>
					<div className='row'>
						{
							ads && ads.map((ad: IAds) => (
								<div
									key={ad.id}
									className='col-md-4 col-lg-3'
								>
									<Ad ads={ad} />
								</div>
							))
						}
					</div>
				</div>
			</section>
		);
	}
}

export default Ads;
