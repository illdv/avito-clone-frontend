import React from 'react';
import { connect } from 'react-redux';

import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';
import { getLocationState } from 'client/common/store/selectors';
import Modal from 'client/common/modal-juggler/Modal';
import {
	changeCityLocal,
	changeCitySession,
	changeCountryLocal,
	changeCountrySession,
	changeRegionLocal,
	changeRegionSession,
	ILocationStoreState,
} from 'client/common/location/module';
import DataList from '../location/components/DataList';

export interface ILocationModalProps {
	locationState: ILocationStoreState;
	changeCityLocal: (id: number) => void;
	changeCitySession: (id: number) => void;
	changeCountryLocal: (id: number) => void;
	changeCountrySession: (id: number) => void;
	changeRegionLocal: (id: number) => void;
	changeRegionSession: (id: number) => void;
}

const mapStateToProps = state => ({
	locationState: getLocationState(state),
});

const mapDispatchToProps = dispatch => ({
	changeCityLocal: id => dispatch(changeCityLocal(id)),
	changeCitySession: id => dispatch(changeCitySession(id)),
	changeCountryLocal: id => dispatch(changeCountryLocal(id)),
	changeCountrySession: id => dispatch(changeCountrySession(id)),
	changeRegionLocal: id => dispatch(changeRegionLocal(id)),
	changeRegionSession: id => dispatch(changeRegionSession(id)),
});

export class LocationModal extends React.Component<ILocationModalProps> {

	get prepareDataForCountry() {
		return this.props.locationState.loaded.local.countries.map(item => ({
			id: item.country_id,
			title: item.title,
		}));
	}

	get prepareDataForRegion() {
		return this.props.locationState.loaded.local.regions.map(item => ({
			id: item.region_id,
			title: item.title,
		}));
	}

	get prepareDataForCity() {
		return this.props.locationState.loaded.local.cities.map(item => ({
			id: item.city_id,
			title: item.title,
		}));
	}

	render() {
		return (
			<Modal name={ModalNames.searchLocation} useOnRequestClose={true}>
				<div className='login-block'>
					<div className='login-links'>
						<a
							className={`p-x-22`}
						>
							SET LOCATION
						</a>
					</div>
					<div className='login-form'>
						<DataList
							label={'Country'}
							labelEnabled={true}
							data={this.prepareDataForCountry}
							onSelect={this.props.changeCountryLocal}
							idActive={this.props.locationState.local.idCountry}
						/>
						<DataList
							label={'State'}
							labelEnabled={true}
							data={this.prepareDataForRegion}
							onSelect={this.props.changeRegionLocal}
							idActive={this.props.locationState.local.idRegion}
						/>
						<DataList
							label={'City'}
							labelEnabled={true}
							data={this.prepareDataForCity}
							onSelect={this.props.changeCityLocal}
							idActive={this.props.locationState.local.idCity}
						/>
					</div>
				</div>
			</Modal>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationModal);
