import React from 'react';
import NumberFormat from 'react-number-format';
import Link from 'next/link';
import { ISimilarAdProps } from 'client/ssr/blocks/ad/interface';

const SimilarRandomAd = ({similar_ad}: ISimilarAdProps) => (
		<div className='similar-ad'>
			<div className='row'>
				<div className='col-md-6 col-lg-7'>
					<Link href={`${similar_ad.id}`}>
						<a className='similar-ad__title'>{similar_ad.title}</a>
					</Link>
					<br />
					{
						similar_ad.description.length > 65 ?
							<span>{similar_ad.description.slice(0, 65) + '...'}</span>
							: <span>{similar_ad.description}</span>
					}
					<span className='badge badge-secondary d-inline-block bg-orange'>
							<NumberFormat
								value={similar_ad.price}
								displayType={'text'}
								suffix={'$'}
								thousandSeparator={' '}
							/>
						</span><br />
					<span className='f-s-12 f-w-300'>{similar_ad.userName}</span>
				</div>
				<div className='col-md-6 col-lg-5 text-right'>
					<img
						src={similar_ad.images[0].file_url}
						alt=''
						className='right'
					/>
				</div>
			</div>
		</div>
);

export default SimilarRandomAd;