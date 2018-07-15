import React from 'react';

require('./Categories.sass');

class Categories extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (
            <section className="section-xs">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 ">
                            <h3>Categories</h3>
                        </div>
                    </div>
                    <div className="row p-y-20">
                        <div className="col-12">
                            <div className="category-tiles">
                                    <div className="tile">
                                        <a href="#">
                                        <div className="tile-inner">
                                            <span></span>
                                            <div className="catg-info text-right">
                                                <h4>Cars</h4>
                                                <span>2359 ads</span>
                                            </div>
                                            <div className="catg-img">
                                                <img src="/static/img/categories/car.png" alt="" />
                                            </div>
                                        </div>
                                        </a>
                                    </div>
                                <div className="tile">
                                    <a href="">
                                    <div className="tile-inner">
                                        <div className="catg-info text-left">
                                            <h4>Properties</h4>
                                            <span>2359 ads</span>
                                        </div>
                                        <div className="catg-img right">
                                            <img src="/static/img/categories/property.png" alt="" />
                                        </div>

                                    </div>
                                    </a>
                                </div>

                                <div className="tile vertical">
                                    <a href="#">
                                    <div className="tile-inner">
                                        <div className="catg-info">
                                            <h4>Pets</h4>
                                            <span>2359 ads</span>
                                        </div>
                                        <img src="/static/img/categories/dog.png" alt="" />
                                    </div>
                                    </a>
                                </div>
                                <div className="tile">
                                    <a href="#">
                                    <div className="tile-inner">
                                        <div className="catg-info text-left">
                                            <h4>Electronics, Appliances</h4>
                                        </div>
                                        <div className="catg-img right">
                                            <img src="/static/img/categories/mac.png" alt="" />
                                        </div>
                                    </div>
                                    </a>
                                </div>
                                <div className="tile">
                                    <a href="#">
                                    <div className="tile-inner">
                                        <div className="catg-info text-right">
                                            <h4>For Home, Cottage</h4>
                                        </div>
                                        <img src="/static/img/categories/kitchen.png" alt="" />
                                    </div>
                                    </a>
                                </div>
                                <div className="tile">
                                    <a href="#">
                                    <div className="tile-inner">
                                        <div className="catg-info text-right">
                                            <h4>Things</h4>
                                        </div>
                                        <div className="catg-img">
                                            <img src="/static/img/categories/shirt.png" alt="" />
                                        </div>
                                    </div>
                                    </a>
                                </div>
                                <div className="tile vertical">
                                    <a href="#">
                                    <div className="tile-inner">
                                        <div className="catg-info">
                                            <h4>Business, Jobs</h4>
                                            <span>2359 ads</span>
                                        </div>
                                        <div>
                                            <img src="/static/img/categories/job.png" alt="" />
                                        </div>
                                    </div>
                                    </a>
                                </div>
                                <div className="tile">
                                    <a href="#">
                                    <div className="tile-inner">
                                        <div className="catg-info text-right">
                                            <h4>Services</h4>
                                            <span>2359 ads</span>
                                        </div>
                                        <div className="catg-img">
                                            <img src="/static/img/categories/work.png" alt="" />
                                        </div>
                                    </div>
                                    </a>
                                </div>
                                <div className="tile">
                                    <a href="#">
                                    <div className="tile-inner">
                                        <div className="catg-info text-left">
                                            <h4>Hobbies, Recreation</h4>
                                            <span>2359 ads</span>
                                        </div>
                                        <div className="catg-img right">
                                            <img src="/static/img/categories/tennis.png" alt="" />
                                        </div>
                                    </div>
                                    </a>
                                </div>
                                <div className="tile all-catg">
                                    <div className="tile-inner">
                                        <div className="catg-info text-left">
                                            <h4 className="p-b-20">All categories</h4>
                                            <a href="#" className="btn grey-btn">
                                                Select products
                                                <span className="p-x-5">
                                                    <i className="fas fa-arrow-right" />
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Categories;