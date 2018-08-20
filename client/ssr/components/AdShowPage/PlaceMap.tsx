import React, { Component } from 'react';
import { IGMProps, IGMState } from 'client/ssr/blocks/ad/interface';

class PlaceMap extends Component<IGMProps, IGMState> {
	state = {
		zoom: 20,
		show: false,
	};

	showMap = () => {
		this.setState({
			show: !this.state.show,
		});
	}

	render() {
		const { city, coordinatesMap, address } = this.props;
		// const { zoom, show } = this.state;
		return (
			<div className='row'>
				<div className='col-lg-8 offer-address'>  {/* TODO if use map then col-lg-4  */}
					<h5 className='offer-address__title'>
						Address:
						<span> {address}</span>
					</h5>
				</div>
				{/*<div className='col-lg-4'>*/}
					{/*<button className='btn orange-btn-outline' onClick={this.showMap}>*/}
						{/*{*/}
							{/*show ? 'Hide Map' : 'Show Map'*/}
						{/*}*/}
					{/*</button>*/}
				{/*</div>*/}
				{/*{*/}
					{/*show &&*/}
						{/*<LocationSail*/}
							{/*coordinatesMap={coordinatesMap}*/}
							{/*zoom={zoom}*/}
						{/*/>*/}
				{/*}*/}
			</div>
		);
	}
}

export default PlaceMap;