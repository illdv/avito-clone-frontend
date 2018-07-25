import React, { Component } from 'react';
import SimilarAds from 'client/ssr/blocks/ad/components/SimilarAds';
import { IChart } from 'client/ssr/blocks/ad/interface';

class Chart extends Component<IChart> {
	render() {
		return (
			<div className='row p-t-60'>
				<div className='col-lg-8 bg-grey'>
					<img src="http://www.paulund.co.uk/uploads/2012/01/google-map.jpg"/>
				</div>
				<SimilarAds similar_ad={this.props.similar_ad} id_parent={this.props.id_parent}/>
			</div>
		);
	}
}

export default Chart;