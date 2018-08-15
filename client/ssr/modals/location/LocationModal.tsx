import React from 'react';
import Select from 'react-select';

import {ModalNames} from 'client/common/modal-juggler/modalJugglerInterface';
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

interface ISelectedOption {
	value: number;
	label: string;
}

export class LocationModal extends React.Component<ILocationModalProps> {

	initSelectedOption = (id: number, options: ISelectedOption[]): ISelectedOption|null => {
		return options.filter(option => option.value === id)[0] || null;
	}

	get prepareDataForCountryToOptions() {
		const result = this.props.countries.map(item => ({
			value: item.country_id,
			label: item.title,
		}));
		return [...result];
	}

	onSelectCountry = (selectedCountryOption: ISelectedOption): void => {
		this.props.changeCountry(selectedCountryOption.value);
	}

	onClearCountry = () => {
		this.props.changeCountry(null);
	}

	get prepareDataForRegionToOptions() {
		const result = this.props.regions.map(item => ({
			value: item.region_id,
			label: item.title,
		}));
		return [...result];
	}

	onSelectRegion = (selectedRegionOption: ISelectedOption): void => {
		this.props.changeRegion(selectedRegionOption.value);
	}

	onClearRegion = () => {
		this.props.changeRegion(null);
	}

	get prepareDataForCityToOptions() {
		const result = this.props.cities.map(item => ({
			value: item.city_id,
			label: item.title,
		}));
		return [...result];
	}

	onSelectedCity = (selectedCityOption: ISelectedOption): void => {
		this.props.changeCity(selectedCityOption.value);
	}

	onClearCity = () => {
		this.props.changeCity(null);
	}

	close = () => {
		hideLocationModal(ModalNames.location);
	}



	render() {
		const { idCountry, idRegion, idCity } = this.props;

		return (
			<Modal name={this.props.name} useOnRequestClose={true} autocomplete='off'>
				<div className='modal-content location-modal'>
					<div className='modal-header p-20'>
						<h4 className='modal-title' id='exampleModalLongTitle'>Choose your location</h4>
						<button type='button' className='close' onClick={this.close}>
							<span>&times;</span>
						</button>
					</div>
					<div className='modal-body p-20'>
						<form action='' className='choose-location m-b-20'>
							<div className='form-group row align-items-center'>
								<label htmlFor='chooseCountry' className='col-3 choose-location__label'>
									Country
								</label>
								<Select
									className='col-8'
									onChange={this.onSelectCountry}
									options={this.prepareDataForCountryToOptions}
									value={this.initSelectedOption(idCountry, this.prepareDataForCountryToOptions)}
								/>
								<button
									onClick={this.onClearCountry}
									type='button'
									className='close col-1'
									data-dismiss='alert'
									aria-label='Close'
								>
									<span aria-hidden='true'>&times;</span>
								</button>
							</div>
							<div className='form-group row align-items-center'>
								<label htmlFor='chooseState' className='col-3 choose-location__label'>
									State(region)
								</label>
								<Select
									className='col-8'
									onChange={this.onSelectRegion}
									options={this.prepareDataForRegionToOptions}
									value={this.initSelectedOption(idRegion, this.prepareDataForRegionToOptions)}
								/>
								<button
									onClick={this.onClearRegion}
									type='button'
									className='close col-1'
									data-dismiss='alert'
									aria-label='Close'
								>
									<span aria-hidden='true'>&times;</span>
								</button>
							</div>
							<div className='form-group row align-items-center'>
								<label htmlFor='chooseCity' className='col-3 choose-location__label'>
									City
								</label>
								<Select
									className='col-8'
									onChange={this.onSelectedCity}
									options={this.prepareDataForCityToOptions}
									value={this.initSelectedOption(idCity, this.prepareDataForCityToOptions)}
								/>
								<button
									onClick={this.onClearCity}
									type='button'
									className='close col-1'
									data-dismiss='alert'
									aria-label='Close'
								>
									<span aria-hidden='true'>&times;</span>
								</button>
							</div>
							{this.props.children}
						</form>
					</div>
				</div>
			</Modal>
		);
	}
}

export default LocationModal;
