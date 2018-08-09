import React, { Component } from 'react';
import { showLocationModal } from 'client/ssr/modals/location/locationModalTriggers';
import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';
import { ILocationStoreState } from 'client/common/location/module';
import { IRootState } from 'client/common/store/storeInterface';
import { getLocationState } from 'client/common/store/selectors';
import { connect } from 'react-redux';
import { AdsAPI } from 'client/common/api/AdsAPI';
import { accessSync } from 'fs';

export interface ILocationSelectProps {
	locationState: ILocationStoreState;
	city_id?: number;
}

export interface ILocationSelectState {
	city_id?: number;
	title?: any[];
}
const mapStateToProps = (state: IRootState) => ({
	locationState: getLocationState(state),
});



class LocationSelect extends Component<ILocationSelectProps, ILocationSelectState> {
	constructor(props) {
		super(props);

		this.state = {
			city_id: this.props.city_id,
			title: this.cityName,
		};
	};

	get cityName() {
		if (this.props.city_id != ""){
			AdsAPI.getCity(this.props.city_id)
				.then(res => {
					if(res.data.length > 0) {
						this.setState({title: res.data[0].title});
					}
				});
		};
	}

	showSearchLocationModal = () => showLocationModal(ModalNames.searchLocation);

	render() {
		return (
			<input
				readOnly
				type='text'
				placeholder='location'
				value={this.state.title}
				onClick={this.showSearchLocationModal}
				className='search__options form-control search_input--no-disable'
			/>
		);
	}
}

export default connect(mapStateToProps)(LocationSelect);