import React from 'react';
import { connect } from 'react-redux';

import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';
import { getLocationState } from 'client/common/store/selectors';
import {
	changeCityLocal,
	changeCountryLocal,
	changeRegionLocal,
	ILocationStoreState,
} from 'client/common/location/module';
import LocationModal from './LocationModal';

export interface ISearchLocationModalProps {
	locationState: ILocationStoreState;
	changeCountryLocal: (id: number) => void;
	changeRegionLocal: (id: number) => void;
	changeCityLocal: (id: number) => void;
}

const mapStateToProps = state => ({
	locationState: getLocationState(state),
});

const mapDispatchToProps = dispatch => ({
	changeCountryLocal: id => dispatch(changeCountryLocal(id)),
	changeRegionLocal: id => dispatch(changeRegionLocal(id)),
	changeCityLocal: id => dispatch(changeCityLocal(id)),
});

export class SearchLocationModal extends React.Component<ISearchLocationModalProps> {

	render() {
		return (
			<LocationModal
				name={ModalNames.searchLocation}
				countries={this.props.locationState.loaded.local.countries}
				regions={this.props.locationState.loaded.local.regions}
				cities={this.props.locationState.loaded.local.cities}
				idCountry={this.props.locationState.local.idCountry}
				idRegion={this.props.locationState.local.idRegion}
				idCity={this.props.locationState.local.idCity}
				changeCountry={this.props.changeCountryLocal}
				changeRegion={this.props.changeRegionLocal}
				changeCity={this.props.changeCityLocal}
			/>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchLocationModal);
