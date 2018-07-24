import React from 'react';
import { connect } from 'react-redux';

import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';
import { getLocationState } from 'client/common/store/selectors';
import {
	changeCitySession,
	changeCountrySession,
	changeRegionSession,
	ILocationStoreState,
} from 'client/common/location/module';
import LocationModal from './LocationModal';

export interface IMainLocationModalProps {
	locationState: ILocationStoreState;
	changeCountrySession: (id: number) => void;
	changeRegionSession: (id: number) => void;
	changeCitySession: (id: number) => void;
}

const mapStateToProps = state => ({
	locationState: getLocationState(state),
});

const mapDispatchToProps = dispatch => ({
	changeCountrySession: id => dispatch(changeCountrySession(id)),
	changeRegionSession: id => dispatch(changeRegionSession(id)),
	changeCitySession: id => dispatch(changeCitySession(id)),
});

export class MainLocationModal extends React.Component<IMainLocationModalProps> {

	render() {
		return (
			<LocationModal
				name={ModalNames.location}
				countries={this.props.locationState.loaded.session.countries}
				regions={this.props.locationState.loaded.session.regions}
				cities={this.props.locationState.loaded.session.cities}
				idCountry={this.props.locationState.session.idCountry}
				idRegion={this.props.locationState.session.idRegion}
				idCity={this.props.locationState.session.idCity}
				changeCountry={this.props.changeCountrySession}
				changeRegion={this.props.changeRegionSession}
				changeCity={this.props.changeCitySession}
			/>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainLocationModal);
