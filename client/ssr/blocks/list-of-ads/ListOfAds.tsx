import React from 'react';
import { IAds } from 'client/ssr/blocks/list-of-ads/entries/ads/interface';
import Ad from 'client/ssr/blocks/list-of-ads/components/Ad';

require('./ListOfAds.sass');

export interface IAdsProps {
	title: string;
	ads: IAds[];
}

class Ads extends React.PureComponent<IAdsProps> {
	render() {
		return (
			<section className='section-lg'>
				<div className='container'>
					<div className='row p-b-20'>
						<div className='col-md-12 '>
							<h3>{this.props.title}</h3>
						</div>
					</div>
					<div className='row'>
						{
							this.props.ads.map((ad: IAds) => (
								<div
									key={ad.id}
									className='col-md-4 col-lg-3'
								>
									<Ad data={ad} />
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
