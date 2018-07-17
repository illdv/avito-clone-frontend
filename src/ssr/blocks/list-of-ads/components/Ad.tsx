import React from 'react';

export interface IAdInfo {
    name: string;
    price: string;
	description: string;
	date: string;
}

export interface IAd {
    id: string;
    img: string;
    info: IAdInfo;
}

export default ({ data }: { data: IAd }) => (
    <div className="ads-tile">
        <div className="ads-img">
            <a href="#">
                <img src="/static/img/icons/like-white.svg" className="like" alt="" />
            </a>
            <img src={ data.img } alt=""/>
        </div>
        <div className="ads-info">
                <a>{data.info.name}</a>
            <span>{ data.info.price }</span>
            <span>{ data.info.description }</span>
            <span>{ data.info.date }</span>
        </div>
    </div>
);