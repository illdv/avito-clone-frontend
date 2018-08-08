import React, { Component } from 'react';
import { IGMProps, IGMState } from 'client/ssr/blocks/ad/interface';
import Mapster from 'client/ssr/blocks/ad/components/Mapster';

class PlaceMap extends Component<IGMProps, IGMState> {

	onClick = () => {
		this.setState({ show: !this.state.show });
	};

	constructor(props) {
		super(props);
		this.state = {
			zoom: 20,
			show: false,
		};
	}

	render() {
		return (
			<div className='row'>
				<div className='col-lg-8 offer-address'>
					<h5 className='offer-address__title'>
						Address:
						<span> {this.props.address}</span>
					</h5>
				</div>
				{/*<div className='col-lg-4'>*/}
					{/*<button*/}
						{/*className='btn orange-btn-outline'*/}
						{/*onClick={this.onClick}*/}
					{/*>*/}
						{/*{this.state.show ? 'Hide Map' : 'Show Map'}*/}
					{/*</button>*/}
				{/*</div>*/}
				{/*{*/}
					{/*this.state.show &&*/}
							{/*<Mapster*/}
								{/*default_map={this.props.default_map}*/}
								{/*isMarkerShown={this.props.default_map}*/}
								{/*zoom={this.state.zoom}*/}
							{/*/>*/}
				{/*}*/}
			</div>
		);
	}

}

export default PlaceMap;