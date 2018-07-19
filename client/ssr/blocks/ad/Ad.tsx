import React from 'react';

import Breadcrumbs from './components/Breadcrumbs';
import SliderImages from './components/SliderImages';
import Seller from './components/Seller';
import VehicleKit from './components/VehicleKit';
import Chart from './components/Chart';
import NumberFormat from 'react-number-format';
import { IAd } from 'client/ssr/blocks/ad/interface';
import VehicleFeature from 'client/ssr/blocks/ad/components/VehicleFeature'
import VehicleDescription from 'client/ssr/blocks/ad/components/VehicleDescription'
import Link from 'next/link';

require('./Ad.sass');

const images = [
    {
        original: '/static/img/ads/ads.png',
        thumbnail: '/static/img/ads/ads.png',
    },
    {
        original: '/static/img/ads/ads.png',
        thumbnail: '/static/img/ads/ads.png',
    },
    {
        original: '/static/img/ads/ads.png',
        thumbnail: '/static/img/ads/ads.png',
    },
    {
        original: '/static/img/ads/ads.png',
        thumbnail: '/static/img/ads/ads.png',
    },
    {
        original: '/static/img/ads/ads.png',
        thumbnail: '/static/img/ads/ads.png',
    },
];

const user = {
    name: 'Andrey Beregovoi',
    avatar: '/static/img/person.png',
    address: 'Germany Berlin',
    phone: '89995965664642',
};
let crumbs = [];
let back = [];

let crumbes = {};

class Ads extends React.PureComponent <IAd> {

    render() {
        return (
            <React.Fragment>
                <section className='heading'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-10'>
                                {getCrumbs(this.props.categories, this.props.ad.category_id, this.props.ad.id, this.props.ad.city)}
                                <Breadcrumbs breadcrumbs={crumbs} />
                            </div>
                            {backToCatalog()}
                            <div className='col-md-2 back-next'>
                                <Link href={`${back[0].crumbs.href}`}>
                                    <a className='orange-text'>
                                        Back
                                    </a>
                                </Link>
                                <Link href={`${this.props.ad.next_ad}`}>
                                <a className='p-x-5 orange-text'>Next <i className='fas fa-arrow-right p-l-5 orange-text' />
                                </a>
                                </Link>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-12 col-lg-8'>
                                <h1 className='m-b-15'>{this.props.ad.title}</h1>
                                <h5 className='f-s-14 f-w-400 m-b-15'>№ <span>{this.props.ad.id}</span>,
                                    added <span>{this.props.ad.created_at}</span></h5>
                                <span className='f-s-14'>
							<i className='fas fa-sync-alt orange-text' />
							<span> {this.props.ad.updated_at} </span>
						</span>
                                <span className='f-s-14'>
							<i className='fas fa-eye orange-text' />
							<span> {this.props.ad.total_visits} </span>
							(Today's <span> {this.props.ad.today_visits}</span>)
						</span>
                                <button className='btn orange-btn-outline m-t-10 d-block no-b-r'>Add to favourites
                                </button>
                            </div>
                            <div className='col-md-12 col-lg-4'>
						<span className='price'>
							<NumberFormat
           value={this.props.ad.price}
           displayType={'text'}
           suffix={'$'}
           thousandSeparator={' '}

       />
						</span>
                            </div>
                        </div>
                        <div className='row p-y-20'>
                            <SliderImages images={images} />
                            <VehicleFeature options={this.props.ad.options} />
                        </div>
                        <div className='row'>
                            <Seller user={this.props.ad.user} />
                        </div>
                    </div>
                </section>
                <section className='section-mb'>
                    <div className='container'>
                        <VehicleDescription body={this.props.ad.body} />
                        <VehicleKit />
                        <Chart />
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

function getCrumbs(cats, cat_id, id_ad, city) {
    crumbs.push({name:'All listings in '+city.name, href: encodeURI('/'+city.name)});
    cats.map((items) => {
       return recurseCrumbs(items, cat_id)
    })
    formationHref(crumbes, cat_id, id_ad);

}

function recurseCrumbs(items, cat_id) {
    if (items.id == cat_id) {
        crumbes = items;
    } else {
        if (items.children.length > 0) {
            items.children.map((item) => {
                if (item.id == cat_id) {
                   return crumbes = items;
                } else {
                    return item;
                }
            });
        }
        if (JSON.stringify(crumbes) !== '')
        {
            return crumbes;
        }
    }
}

function formationHref(crumbes, cat_id, ad_id) {
    crumbs.push({name: crumbes.title, href:'/'+encodeURI(crumbes.title)});

    crumbes.children.map((item) => {
       if (item.id == cat_id) {
           crumbs.push({name: item.title, href: '/'+encodeURI(item.title)});
       } else {
           if (item.children.length > 0) {
               item.children.map((child) => {
                   if (child.id == cat_id) {
                       return crumbs.push({name: child.title, href:'/'+encodeURI(child.title)})
                   } else {
                       return item;
                   }
               });
           }

       }

    });
    return crumbs.push({name:ad_id, href: '/'+ad_id})
}

function backToCatalog() {
    back.push({crumbs: crumbs[crumbs.length-2]});
}

export default Ads;