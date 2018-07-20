import React, { Component } from 'react';
import { ISimilarProps } from 'client/ssr/blocks/ad/interface';
import NumberFormat from 'react-number-format';
import Link from 'next/link';

class SimilarRandomAd extends Component<ISimilarProps> {
	render() {
		return (
			<div className='similar-ads-item'>
				<div className='row no-gutters'>
					<div className='col-md-6 col-lg-6'>
						<Link href={`${this.props.id}`}>
						<a className='f-s-14'>{this.props.title}</a>
						</Link>
							<br />
						<span className='f-s-13'>{this.props.description}</span>
						<span className='f-s-13 badge badge-secondary d-inline-block bg-orange'>
							<NumberFormat
								value={this.props.price}
								displayType={'text'}
								suffix={'$'}
								thousandSeparator={' '}

							/>
						</span><br />
						<span className='f-s-12 f-w-300'>{this.props.userName}</span>
					</div>
					<div className='col-md-6 col-lg-6 text-right'>
						<img
							src='/static/img/ads/ads3.png'
							alt=''
							className='right'
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default SimilarRandomAd;