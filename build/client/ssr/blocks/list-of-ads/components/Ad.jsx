import React from 'react';
import Link from 'next/link';
export default ({ data }) => (<div className='ads-tile'>
        <div className='ads-img'>
            <a href='#'>
                <img src='/static/img/icons/like-white.svg' className='like' alt=''/>
            </a>
            <img src={data.img} alt=''/>
        </div>
        <div className='ads-info'>
            <Link href={`ad/${data.id}`}>{data.info.name}</Link>
            <span>{data.info.price}</span>
            <span>{data.info.description}</span>
            <span>{data.info.date}</span>
        </div>
    </div>);
//# sourceMappingURL=Ad.jsx.map