import React from 'react';

import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';
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
import DataList from './components/DataList';
import { hideLocationModal } from './locationModalTriggers';

export interface ILocationModalProps {
	name: ModalNames;
	countries: any[];
	regions: any[];
	cities: any[];
	idCountry: number;
	idRegion: number;
	idCity: number;
	changeCity: (id: number) => void;
	changeRegion: (id: number) => void;
	changeCountry: (id: number) => void;
}

export class LocationModal extends React.Component<ILocationModalProps> {

	get prepareDataForCountry() {
		const result = this.props.countries.map(item => ({
			id: item.country_id,
			title: item.title,
		}));
		return [...result];
	}

	get prepareDataForRegion() {
		const result = this.props.regions.map(item => ({
			id: item.region_id,
			title: item.title,
		}));
		return [...result];
	}

	get prepareDataForCity() {
		const result = this.props.cities.map(item => ({
			id: item.city_id,
			title: item.title,
		}));
		return [...result];
	}

	close = () => {
		hideLocationModal(this.props.name);
	}

	render() {
		return (
			<Modal name={this.props.name} useOnRequestClose={true}>
				<div className='modal-content'>
					<div className='modal-header'>
						<h4 className='modal-title' id='exampleModalLongTitle'>Choose your location</h4>
						<button type='button' className='close' onClick={this.close} >
							<span>&times;</span>
						</button>
					</div>
					<div className='modal-body'>
						<div>
							<form action='' className='choose-location'>
								<div className='form-group row align-items-center'>
						   			<label htmlFor='chooseCountry' className='col-3 choose-location__label'>
									   Country
									</label>
									<DataList
										name='country'
										groupClassName='col-8'
										inputId='chooseCountry'
										inputClassName='form-control datalist'
										data={this.prepareDataForCountry}
										onSelect={this.props.changeCountry}
										idActive={this.props.idCountry}
									/>
								</div>
								<div className='form-group row align-items-center'>
						   			<label htmlFor='chooseState' className='col-3 choose-location__label'>
									   State(region)
									</label>
									<DataList
										name='state'
										groupClassName='col-8'
										inputId='chooseState'
										inputClassName='form-control datalist'
										data={this.prepareDataForRegion}
										onSelect={this.props.changeRegion}
										idActive={this.props.idRegion}
									/>
								</div>
								<div className='form-group row align-items-center'>
						   			<label htmlFor='chooseCity' className='col-3 choose-location__label'>
									   City
									</label>
									<DataList
										name='city'
										groupClassName='col-8'
										inputId='chooseCity'
										inputClassName='form-control datalist'
										data={this.prepareDataForCity}
										onSelect={this.props.changeCity}
										idActive={this.props.idCity}
									/>
								</div>
							</form>
						</div>
					</div>
					{this.props.children}
					<div className='modal-footer'>
						<button type='button' className='btn button button_bright w-100' onClick={this.close}>Confirm location</button>
					</div>
				</div>
			</Modal>
		);
	}
}

export default LocationModal;
