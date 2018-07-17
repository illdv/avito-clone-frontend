import React from 'react';
require('./Categories.sass');
class Categories extends React.Component {
    render() {
        return (<section className="section-xs">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 ">
                            <h3 className="main-caption">Categories</h3>
                        </div>
                    </div>
                    <div className="row p-y-20">
                        <div className="col-12">
                            <div className="tiles">
                                    <div className="tile">
                                        <a href="#">
                                        <div className="tile__inner">
                                            <div className="category text-right">
                                                <h4 className="category__caption">Cars</h4>
                                                <span className="category__count">2359 ads</span>
                                            </div>
                                            <div className="tile__image">
                                                <img src="/static/img/categories/car.png" alt=""/>
                                            </div>
                                        </div>
                                        </a>
                                    </div>
                                <div className="tile">
                                    <a href="">
                                    <div className="tile__inner">
                                        <div className="category text-left">
                                            <h4 className="category__caption">Properties</h4>
                                            <span className="category__count">2359 ads</span>
                                        </div>
                                        <div className="tile__image right">
                                            <img src="/static/img/categories/property.png" alt=""/>
                                        </div>

                                    </div>
                                    </a>
                                </div>

                                <div className="tile tile_vertical">
                                    <a href="#">
                                    <div className="tile__inner">
                                        <div className="category">
                                            <h4 className="category__caption">Pets</h4>
                                            <span className="category__count">2359 ads</span>
                                        </div>
                                        <img className="tile__image_vertical" src="/static/img/categories/dog.png" alt=""/>
                                    </div>
                                    </a>
                                </div>
                                <div className="tile">
                                    <a href="#">
                                    <div className="tile__inner">
                                        <div className="category text-left">
                                            <h4 className="category__caption">Electronics, Appliances</h4>
                                        </div>
                                        <div className="tile__image right">
                                            <img src="/static/img/categories/mac.png" alt=""/>
                                        </div>
                                    </div>
                                    </a>
                                </div>
                                <div className="tile">
                                    <a href="#">
                                    <div className="tile__inner">
                                        <div className="category text-right">
                                            <h4 className="category__caption">For Home, Cottage</h4>
                                        </div>
                                            <img src="/static/img/categories/kitchen.png" alt=""/>
                                    </div>
                                    </a>
                                </div>
                                <div className="tile">
                                    <a href="#">
                                    <div className="tile__inner">
                                        <div className="category text-right">
                                            <h4 className="category__caption">Things</h4>
                                        </div>
                                        <div className="tile__image">
                                            <img src="/static/img/categories/shirt.png" alt=""/>
                                        </div>
                                    </div>
                                    </a>
                                </div>
                                <div className="tile tile_vertical">
                                    <a href="#">
                                    <div className="tile__inner">
                                        <div className="category">
                                            <h4 className="category__caption">Business, Jobs</h4>
                                            <span className="category__count">2359 ads</span>
                                        </div>
                                            <div>
                                                <img className="tile__image_vertical" src="/static/img/categories/job.png" alt=""/>
                                            </div>
                                    </div>
                                    </a>
                                </div>
                                <div className="tile">
                                    <a href="#">
                                    <div className="tile__inner">
                                        <div className="category text-right">
                                            <h4 className="category__caption">Services</h4>
                                            <span className="category__count">2359 ads</span>
                                        </div>
                                        <div className="tile__image">
                                            <img src="/static/img/categories/work.png" alt=""/>
                                        </div>
                                    </div>
                                    </a>
                                </div>
                                <div className="tile">
                                    <a href="#">
                                    <div className="tile__inner">
                                        <div className="category text-left">
                                            <h4 className="category__caption">Hobbies, Recreation</h4>
                                            <span className="category__count">2359 ads</span>
                                        </div>
                                        <div className="tile__image right">
                                            <img src="/static/img/categories/tennis.png" alt=""/>
                                        </div>
                                    </div>
                                    </a>
                                </div>
                                <div className="tile tile-categories">
                                    <div className="tile__inner">
                                        <div className="category text-left">
                                            <h4 className="category__caption p-b-20">All categories</h4>
                                            <a href="#" className="btn grey-btn">
                                                Select products
                                                <span className="p-x-5">
                                                    <i className="fas fa-arrow-right"/>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>);
    }
}
export default Categories;
//# sourceMappingURL=Categories.jsx.map