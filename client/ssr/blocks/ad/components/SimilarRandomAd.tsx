import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import Link from 'next/link';
import { ISimilarAdProps } from 'client/ssr/blocks/ad/interface';

class SimilarRandomAd extends Component<ISimilarAdProps> {
	render() {
		return (
			<div className='similar-ad'>
				<div className='row'>
					<div className='col-md-6 col-lg-7'>
						<Link href={`${this.props.similar_ad.id}`}>
							<a className='similar-ad__title'>{this.props.similar_ad.title}</a>
						</Link>
						<br/>
						{
							this.props.similar_ad.description.length > 65 ?
								<span>{this.props.similar_ad.description.slice(0, 65) + '...'}</span>
								: <span>{this.props.similar_ad.description}</span>
						}
						<span className='badge badge-secondary d-inline-block bg-orange'>
							<NumberFormat
								value={this.props.similar_ad.price}
								displayType={'text'}
								suffix={'$'}
								thousandSeparator={' '}
							/>
						</span><br/>
						<span className='f-s-12 f-w-300'>{this.props.similar_ad.userName}</span>
					</div>
					<div className='col-md-6 col-lg-5 text-right'>
						<img
							// src={this.props.similar_ad.image[0].file_url}
							alt=''
							className='right'
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default SimilarRandomAd;