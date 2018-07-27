import React from 'react';
import Link from 'next/link';
import {IAds} from 'client/common/ads/interface';
import { extractPreviewImage } from 'client/ssr/blocks/ad/utils';

export default ({ ads, addToFavorites }: { ads: IAds, addToFavorites: (id: string) => void }) => {
	const handleAddToFavorites = () => {
		addToFavorites(ads.id);
	};

	return (<div className='ad__card'>
			<div className='ad__img'>
					<img
						src='/static/img/icons/like-white.svg'
						className='like'
						alt=''
						onClick={handleAddToFavorites}
						style={{cursor: 'pointer'}}
					/>
				<img
					src={extractPreviewImage(ads)}
					alt='Dogs'
				/>
			</div>
			<div className='ad__info'>
				<Link href={`/ad/${ads.id}`}>
					<a><h6 className='ad__title'>{ads.title}</h6></a>
				</Link>
				<span>{ads.price}</span>
				<span>{ads.description}</span>
				<span>{ads.updated_at}</span>
			</div>
		</div>
	);
}