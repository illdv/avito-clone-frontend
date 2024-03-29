import React, { ChangeEvent, Component } from 'react';
import { ICity, ILoaded, IRegion } from 'client/common/location/locationInterface';
import { AdsAPI } from 'client/common/api/AdsAPI';

export interface IProps {
	location: ILoaded;
	currentCity: number;
	error: string;

	onChange(e: ChangeEvent<HTMLInputElement>, title?: string ): void;
}
export interface IDefaultFields {
	id?: number;
	title?: string;
}

export interface IState {
	country_id: number;
	region_id?: number;
	city_id?: number;
	regions: IRegion[];
	cities: ICity[];
	title_country?: string;
	title_region?: string;
	title_city?: string;
}

export interface IOption {
	id: number;
	title: string;
}

const Options = ({id, title}: IOption) => {
	return (
		<option
			value={id}>
				{title}
		</option>
	);
};

class SelectorLocationByAd extends Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			country_id: null,
			city_id: null,
			region_id: null,
			regions: [],
			cities: [],
			title_country: null,
			title_region: null,
			title_city: null,
		};
	}

	changeCountry =e => {
		const id: number = Number(e.target.value);
		if (id !== this.state.country_id) {
			this.setState({
				cities: [],
				regions:[],
				title_city: '',
				city_id: null,
				region_id: null,
				title_country: 'Select country',
				title_region: 'Select region',
			});
		}
		AdsAPI.getRegionsById(id)
			.then(res => {
				this.setState({
					country_id: id,
					regions: res.data,
				});
			})
			.catch(e => console.log(e));
		const count = this.props.location.session.countries.find(country => {
			return country.country_id === id;
		});

		this.setState({
			title_country: count.title,
		});
	}

	changeRegion = e => {
		const id: number = Number(e.target.value);
		if (id !== this.state.region_id){
			this.setState({
				cities: [],
				title_city: 'Select city',
				city_id: null,

			});
		}
		AdsAPI.getCitiesById(id)
			.then(res => {
				this.setState({
					region_id: id,
					cities: res.data,
				});
			})
			.catch(e => console.log(e));

		const regi = this.state.regions.find(region => {
			return region.region_id === id;
		});

		this.setState({
			title_region: regi.title,
		});
	}

	async componentWillMount() {
		if (this.props.currentCity !== 0) {
			const cityResponse = await AdsAPI.getCity(this.props.currentCity);
			const regionResponse = await AdsAPI.getRegionsById(cityResponse.data[0].country_id);
			const cities = await AdsAPI.getCitiesById(cityResponse.data[0].region_id);
			const country = this.props.location.session.countries.find(country => {
				return country.country_id === cityResponse.data[0].country_id;
			});
			const currentRegion = regionResponse.data.find(region => {
				return region.region_id === cityResponse.data[0].region_id;
			});
			this.setState({
				regions: regionResponse.data,
				cities: cities.data,
				country_id: country.country_id,
				city_id: this.props.currentCity,
				region_id: cityResponse.data[0].region_id,
				title_country: country.title,
				title_region: currentRegion.title,
				title_city: cityResponse.data[0].title,
			});
		} else {
			this.setState({
				title_country: 'Select country',
				title_region: 'Select region',
				title_city: 'Select city',
			});
		}

	}

	selectCity =e => {
		const city = this.state.cities.find(city => {
			return Number(city.city_id) === Number(e.target.value);
		});
		const loc = this.state.title_country + ', ' + this.state.title_region + ', ' + city.title;
		this.props.onChange(e, loc);
	}

	render() {
		const { error } = this.props;
		const { countries } = this.props.location.session;
		const { country_id, region_id, city_id, title_region, title_country, title_city,
		      regions, cities} = this.state;
		return (
			<div className='offer-form__item form-group row align-items-center'>
				<label
					htmlFor='location'
					className='col-md-3 col-lg-4 offer-form__label'
				>
					Address
				</label>
				<div className='col-md-9 col-lg-8'>
				<div className='col-md-4 col-lg-4 m-b-15'>
					<select
						className='form-control'
						onChange={this.changeCountry}
						style={error !== '' && country_id === null ? {border: '1px solid red'} : {border: '1px solid silver'}}
					>
						<option defaultValue={country_id}>
							{title_country}
						</option>
						{
							countries.map(country => {
								return <Options id={country.country_id} title={country.title} key={country.country_id}/>;
							})
						}
					</select>
				</div>
					{
						regions.length > 0 &&
						<div className='col-md-4 col-lg-4  m-b-15'>
							<select
								className='form-control'
								onChange={this.changeRegion}
								style={error !== '' && region_id === null ? {border: '1px solid red'} : {border: '1px solid silver'}}
							>
								<option defaultValue={region_id}>{title_region}</option>
								{
									regions.map(region => {
										return <Options id={region.region_id} title={region.title} key={region.region_id}/>;
									})
								}
							</select>
						</div>
					}
					{
						cities.length > 0 &&
						<div className='col-md-4 col-lg-4'>
							<select
								className='form-control'
								onChange={this.selectCity}
								style={error === '' ? {border: '1px solid silver'} : {border: '1px solid red'}}
							>
								<option defaultValue={city_id}>{title_city}</option>
								{
									cities.map(city => {
										return <Options id={city.city_id} title={city.title} key={city.city_id}/>;
									})
								}
							</select>
					</div>
				}
				</div>
			</div>
		);
	}
}

export default SelectorLocationByAd;