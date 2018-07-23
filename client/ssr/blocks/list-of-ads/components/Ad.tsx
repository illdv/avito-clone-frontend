import React from 'react';
import Link from 'next/link';
import {IAds} from 'client/common/ads/interface';

export default ({data}: { data: IAds }) => (
	<div className='ad__card'>
		<div className='ad__img'>
			<a href='#'>
				<img
					src='/static/img/icons/like-white.svg'
					className='like'
					alt=''
				/>
			</a>
			<img
				src={'https://goo.gl/vLUXu9'}
				alt='Dogs'
			/>
		</div>
		<div className='ad__info'>
			<Link href={`/ad/${data.id}`}>
				<a><h6 className='ad__title'>{data.title}</h6></a>
			</Link>
			<span>{data.price}</span>
			<span>{data.description}</span>
			<span>{data.updated_at}</span>
		</div>
	</div>
);
