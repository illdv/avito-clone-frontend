import React from 'react';

import Breadcrumbs from './components/Breadcrumbs';
import SliderImages from './components/SliderImages';
import VehicleFeature, { IVehicleFeature } from './components/VehicleFeature';
import Seller from './components/Seller';
import VehicleDescription, { IVehicleDescription } from './components/VehicleDescription';
import VehicleKit from './components/VehicleKit';
import Chart from './components/Chart';
import NumberFormat from 'react-number-format';
import { ISellerProps } from 'client/ssr/modals/seller/SellerModal'

require('./Ad.sass')

const crumbs = [
    { name: 'All listings in Berlin', href: '/' },
    { name: 'Transport', href: '/sdf' },
    { name: 'Cars', href: '/234' },
    { name: 'BMW', href: '/g34' },
    { name: '525 M', href: '/adv' },
    { name: 'Used', href: '/zdxf2' },
    { name: '1', href: '/dfh4' },
]

const images = [
    {
        original:'/static/img/ads/ads.png',
        thumbnail: '/static/img/ads/ads.png',
    },
    {
        original:'/static/img/ads/ads.png',
        thumbnail: '/static/img/ads/ads.png',
    },
    {
        original:'/static/img/ads/ads.png',
        thumbnail: '/static/img/ads/ads.png',
    },
    {
        original:'/static/img/ads/ads.png',
        thumbnail: '/static/img/ads/ads.png',
    },
    {
        original:'/static/img/ads/ads.png',
        thumbnail: '/static/img/ads/ads.png',
    },
]

const user = {
    name: 'Andrey Beregovoi',
    avatar: '/static/img/person.png',
    address: 'Germany Berlin',
    phone: '89995965664642',
}

export interface IAd {
    ad: {
        id: string,
        title: string,
        created_at: string,
        updated_at: string,
        body: IVehicleDescription,
        description: string,
        price: string,
        options: IVehicleFeature,
        type: any,
        user: ISellerProps,
    }
}



class Ads extends React.PureComponent <IAd> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <React.Fragment>
            <section className="heading">
            <div className='container'>
                <div className="row">
                    <div className="col-md-10">
                        <Breadcrumbs breadcrumbs={ crumbs } />
                    </div>
                    <div className="col-md-2 back-next">
                        <a href="#" className="orange-text">Back</a>
                        <a href="" className="p-x-5 orange-text">Next <i className="fas fa-arrow-right p-l-5 orange-text"></i></a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-lg-8">
                        <h1 className="m-b-15">{this.props.ad.title}</h1>
                        <h5 className="f-s-14 f-w-400 m-b-15">№ <span>{this.props.ad.id}</span>, added <span>{this.props.ad.created_at}</span></h5>
                        <span className="f-s-14">
                            <i className="fas fa-sync-alt orange-text"> </i>
                            <span> {this.props.ad.updated_at} </span>
                        </span>
                        <span className="f-s-14">
                            <i className="fas fa-eye orange-text"></i>
                            <span> 250 </span>
                            (Today's <span> 34</span>)
                        </span>
                        <button className="btn orange-btn-outline m-t-10 d-block no-b-r">Add to favourites</button>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <span className="price">
                            <NumberFormat value={this.props.ad.price}
                                        displayType={'text'}
                                          suffix={'$'}
                                          thousandSeparator={' '}

                            />
                        </span>
                    </div>
                </div>
                <div className="row p-y-20">
                   <SliderImages images={images} />
                   <VehicleFeature options={this.props.ad.options} />
                </div>
                <div className="row">
                   <Seller user={this.props.ad.user}/>
                </div>
            </div>
            </section>
            <section className="section-mb">
                <div className="container">
                    <VehicleDescription body={this.props.ad.body} />
                    <VehicleKit/>
                    <Chart/>
                </div>
            </section>
            </React.Fragment>
        )
    }
}

export default Ads;