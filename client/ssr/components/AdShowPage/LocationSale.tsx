import React from 'react';
import { IGMMarkerProp, ILocationSale } from 'client/ssr/blocks/ad/interface';
import GoogleMapReact from 'google-map-react';

const LocationSail = ({coordinatesMap, zoom}: ILocationSale) => (
			<div className='col-lg-8 p-t-25'>
				<div className='offer-location' style={{height: 400 + 'px'}}>
					<GoogleMapReact
						defaultCenter={coordinatesMap}
						bootstrapURLKeys={{ key: 'AIzaSyDG6zD5QGwF1c8B3vRrtHghVm0WI-poEjA' }}
						defaultZoom={zoom}
					>
					<MarkerMap lat={coordinatesMap.lat} lng={coordinatesMap.lng}/>
					</GoogleMapReact>
				</div>
			</div>
);

const MarkerMap = (props: IGMMarkerProp) => (
	<i className='fas fa-map-marker-alt fa-3x map'/>
);

export default LocationSail;