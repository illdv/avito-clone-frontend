import React from 'react';

import Breadcrumbs from './components/Breadcrumbs';
import SliderImages from "./components/SliderImages";
import Vehicle from "./components/Vehicle";
import Seller from "./components/Seller";

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
    {id: 1, src:'static/img/ads/ads.png'},
    {id: 2, src:'static/img/ads/ads.png'},
    {id: 3, src:'static/img/ads/ads.png'},
]

const options = [
    {
        id: 1,
        brand: 'BMW',
        mileage: '2226545',
        carcase: 'sedan',
        transmission: 'automation',
    }
]

const user = {
    name: 'Andrey Beregovoi',
    avatar: '/static/img/person.png',
    address: 'Germany Berlin',
    phone: '89995965664642',
}



class Ads extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
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
                        <h1 className="m-b-15">BMW 525M, 2018</h1>
                        <h5 className="f-s-14 f-w-400 m-b-15">№ <span>1316057060</span>, added <span>today</span> at
                            <span> 17:21</span></h5>
                        <span className="f-s-14">
                            <i className="fas fa-sync-alt orange-text"> </i>
                            <span> 3 hours ago </span>
                        </span>
                        <span className="f-s-14">
                            <i className="fas fa-eye orange-text"></i>
                            <span> 250 </span>
                            (Today's <span> 34</span>)
                        </span>
                        <button className="btn orange-btn-outline m-t-10 d-block no-b-r">Add to favourites</button>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <span className="price">890 000$</span>
                    </div>
                </div>
                <div className="row p-y-20">
                   <SliderImages urls={images} />
                   <Vehicle options={options} />
                </div>
                <div className="row">
                   <Seller user={user}/>
                </div>
            </div>
        )
    }
}

export default Ads;