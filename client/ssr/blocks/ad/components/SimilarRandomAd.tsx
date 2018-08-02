import React, { Component } from 'react';
import { ISimilarRandomProps, ISimilarRandomState } from 'client/ssr/blocks/ad/interface';
import NumberFormat from 'react-number-format';
import Link from 'next/link';

class SimilarRandomAd extends Component<ISimilarRandomProps, ISimilarRandomState> {
	render() {
		return (
			<div className='similar-ad'>
				<div className='row'>
					<div className='col-md-6 col-lg-7'>
						<Link href={`${this.props.id}`}>
							<a className='similar-ad__title'>{this.props.title}</a>
						</Link>
						<br/>
						{
							this.props.description.length > 65 ? <span>{this.props.description.slice(0, 65) + '...'}</span>
								: <span>{this.props.description}</span>
						}
						<span className='badge badge-secondary d-inline-block bg-orange'>
							<NumberFormat
								value={this.props.price}
								displayType={'text'}
								suffix={'$'}
								thousandSeparator={' '}
							/>
						</span><br/>
						<span className='f-s-12 f-w-300'>{this.props.userName}</span>
					</div>
					<div className='col-md-6 col-lg-5 text-right'>
						{
						  <SimilarImg image={this.props.image.file_url}/>
						}
					</div>
				</div>
			</div>
		);
	}
}
const SimilarImg = (image: string) => {
		return (
				<img
					src={image}
					alt=''
					className='right'
				/>
		);
}

export default SimilarRandomAd;