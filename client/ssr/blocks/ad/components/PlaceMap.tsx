import React, { Component } from 'react';
import { IGMMarkerProp, IGMProps, IGMState } from 'client/ssr/blocks/ad/interface';
import GoogleMapReact from 'google-map-react';

class PlaceMap extends Component<IGMProps, IGMState> {
	constructor(props) {
		super(props);
		this.state = {
			zoom: 20,
		};
	}

	render() {
		return (
			<>
				<div className='row'>
					<div className='col-lg-4 offer-address'>
						<h5 className='offer-address__title'>
							Address:
							<span> Berlin, Tir Garten, Watch 56</span>
						</h5>
					</div>
					<div className='col-lg-4'>
						<button className='btn orange-btn-outline'>
							Hide Map
						</button>
					</div>
					<div className='col-lg-8 p-t-25'>
						<div className='offer-location'>
							<GoogleMapReact
								defaultCenter={this.props.default_map}
								bootstrapURLKeys={{ key: 'AIzaSyDG6zD5QGwF1c8B3vRrtHghVm0WI-poEjA' }}
								defaultZoom={this.state.zoom}
							>
								<MarkerMap
									lat={this.props.default_map.lat}
									lng={this.props.default_map.lng}
								/>
							</GoogleMapReact>
						</div>
					</div>
				</div>
			</>
		);
	}

}

export const MarkerMap = ({ lat, lng }: IGMMarkerProp) => {
	return (
		<i className='fas fa-map-marker fa-3x'></i>
	);
};

export default PlaceMap;