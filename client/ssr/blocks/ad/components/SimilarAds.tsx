import React,  { Component } from 'react';

class SimilarAds extends Component {
    render() {
        return (
            <div className="col-lg-4">
                <div className="similar-ads-head">
                    <div className="row align-items-center">
                        <div className="col-md-12 col-lg-6">
                            <h3 className="caption caption_no-color m-0">Similar ads</h3>
                        </div>
                        <div className="col-md-12 col-lg-6">
                            <select name="similar" id="similar" className="form-control">
                                <option value="" selected hidden>Sort by</option>
                                <option value="">NEW</option>
                            </select>
                        </div>
                    </div>
                    <div className="similar-ads-tiles">
                        <div className="similar-ads-item">
                            <div className="row no-gutters">
                                <div className="col-md-6 col-lg-6">
                                    <a href="#" className="f-s-14">House of 230 m²</a> <br/>
                                    <span className="f-s-13">2018, 10 000 m, Ma </span>
                                    <span className="f-s-13 badge badge-secondary d-inline-block bg-orange">790 000 $</span><br/>
                                    <span className="f-s-12 f-w-300">Adam Born</span>
                                </div>
                                <div className="col-md-6 col-lg-6 text-right">
                                    <img src="/static/img/ads/ads3.png" alt="" className="right"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SimilarAds;