import React from 'react';
import Link from 'next/link';
import { IAds } from 'client/common/ads/interface';

export default ({ data }: { data: IAds }) => (
    <div className='ads-tile'>
        <div className='ads-img'>
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
        <div className='ads-info'>
            <Link href={`ad/${data.id}`}>
                <a><h4>{data.title}</h4></a>
            </Link>
            <span>{'not cost'}</span>
            <span>{data.description}</span>
            <span>{data.updated_at}</span>
        </div>
    </div>
);
