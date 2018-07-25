import React, { Component } from 'react';
import SimilarAds from 'client/ssr/blocks/ad/components/SimilarAds';
import { IChart, IChartState } from 'client/ssr/blocks/ad/interface';
import GoogleMapReact from 'google-map-react';

class Chart extends Component<IChart, IChartState> {
	constructor(props) {
		super(props);
		this.state = {
			zoom: 20,
		};
	}

	render() {
		return (
			<div className='row p-t-60'>
				<div className='col-lg-8'>
					<GoogleMapReact
						defaultCenter={this.props.default_map}
						bootstrapURLKeys={{key: 'AIzaSyDG6zD5QGwF1c8B3vRrtHghVm0WI-poEjA'}}
						defaultZoom={this.state.zoom}
					/>
				</div>
				<SimilarAds similar_ad={this.props.similar_ad} id_parent={this.props.id_parent}/>
			</div>
		);
	}
}

export default Chart;