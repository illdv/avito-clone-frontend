import React, { Component } from 'react';
import { IGMMarkerProp, IGMProps} from 'client/ssr/blocks/ad/interface';
import GoogleMapReact from 'google-map-react';

class Mapster extends Component<IGMProps> {
	render() {
		return (
			<div className='col-lg-8 p-t-25'>
				<div className='offer-location'>
					<GoogleMapReact
						defaultCenter={this.props.default_map}
						bootstrapURLKeys={{ key: 'AIzaSyDG6zD5QGwF1c8B3vRrtHghVm0WI-poEjA' }}
						defaultZoom={this.props.zoom}
					>
					<MarkerMap lat={this.props.default_map.lat} lng={this.props.default_map.lng}/>
					</GoogleMapReact>
				</div>
			</div>
		);
	}
}

export const MarkerMap = ({ lat, lng }: IGMMarkerProp) => {
	return (
		<i className='fas fa-map-marker-alt fa-3x map'/>
	);
};

export default Mapster;