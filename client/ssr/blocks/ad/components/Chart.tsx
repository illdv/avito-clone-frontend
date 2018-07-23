import React, {Component} from 'react';
import SimilarAds from 'client/ssr/blocks/ad/components/SimilarAds';
import {IChart} from 'client/ssr/blocks/ad/interface';

class Chart extends Component<IChart> {
	render() {
		return (
			<div className='row p-t-40'>
				<div className='col-lg-8'>
					<div className='chart__container'>PLACE FOR CHART</div>
				</div>
				<SimilarAds random={this.props.randomAd}/>
			</div>
		);
	}
}

export default Chart;