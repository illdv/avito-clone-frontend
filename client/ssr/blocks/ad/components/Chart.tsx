import React, { Component } from 'react';
import SimilarAds from 'client/ssr/blocks/ad/components/SimilarAds'

class Chart extends Component {
    render() {
        return (
            <div className="row p-t-60">
                <div className="col-lg-8 bg-grey">PLACE FOR CHART </div>
                <SimilarAds/>
            </div>
        )
    }
}

export default Chart;