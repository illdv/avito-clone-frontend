import React, { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import queryString from 'query-string';
import Router from 'next/router';

import SelectCategories from './components/SelectCategories';
import { IRootState } from 'client/common/store/storeInterface';
import { getLocationState } from 'client/common/store/selectors';
import { getCategories, Category } from 'client/ssr/blocks/categories/context';
import { ILocationStoreState } from 'client/common/location/module';

import { showLocationModal } from 'client/ssr/modals/location/locationModalTriggers';
import { ModalNames } from '../../../common/modal-juggler/modalJugglerInterface';

require('./Search.sass');

interface ISearchProps {
	categories: Category;
	idActiveCategory: number;
	locationState: ILocationStoreState;
}

interface ISearchState {
	searchString: string;
	activeCategories: any;
	duplicateCategories: any;
}

const mapStateToProps = (state: IRootState) => ({
	locationState: getLocationState(state),
	user: state.user,
});

const getOption = option => (
	<input name='name' className='search search__options form-control' placeholder={option.name}/>
);

class Search extends Component<ISearchProps, ISearchState> {
	constructor(props, context) {
		super(props, context);

		let search;

		if (typeof window !== 'undefined') {
			search = queryString.parse(window.location.search).search;
		}

		this.state = {
			duplicateCategories: this.props.categories,
			activeCategories: [],
			searchString: search || '',
		};
	}


	onSelectCategory = category => {
		if (category) {
			if (this.state.activeCategories[0] !== category) {
				this.setState({
					activeCategories: [category],
				});
			}
		} else {
			this.setState({activeCategories: []});
		}
	}

	onSelectSubcategory = (category, parent) => {
		const categories = this.state.activeCategories;

		const indexParent = categories.indexOf(parent);

		if (category) {
			if (indexParent !== -1) {
				const newCategories = categories.slice(0, indexParent + 1);
				newCategories.push(category);

				this.setState({
					activeCategories: newCategories,
				});
			} else {
				throw new Error('Parent no found');
			}
		} else {
			const newCategories = categories.slice(0, indexParent + 1);
			this.setState({
				activeCategories: newCategories,
			});
		}

	}

	get subcategories() {
		return this.state.activeCategories;
	}

	get isSubcategories() {
		return this.subcategories.length > 0;
	}

	get categories() {
		return this.state.activeCategories;
	}

	get lastSubcategory() {
		return this.state.activeCategories[this.state.activeCategories.length - 1];
	}

	get localeName() {
		const { idCity, idRegion, idCountry } = this.props.locationState.local;

		if (idCity) {
			if (this.props.locationState.loaded.local.cities.length > 0) {

				const result = this.props.locationState.loaded.local.cities.filter(city => {
					return city.city_id === idCity;
				});

				if (result.length > 0) {
					return result[0].title; 
				}
			}
		}

		if (idRegion) {
			if (this.props.locationState.loaded.local.regions.length > 0) {
				const result = this.props.locationState.loaded.local.regions.filter(region => {
					return region.region_id === idRegion;
				});
				if (result.length > 0) {
					return result[0].title; 
				}
			}
		}

		if (idCountry) {
			if (this.props.locationState.loaded.local.countries.length > 0) {
				const result = this.props.locationState.loaded.local.countries.filter(country => {
					return country.country_id === idCountry;
				});
				if (result.length > 0) {
					return result[0].title; 
				}
			}
		}

		return 'World';
	}

	changeSearchString = e => {
		this.setState({
			searchString: e.target.value,
		});
	}

	showSearchLocationModal = () => showLocationModal(ModalNames.searchLocation);

	onSubmit = e => {
		e.preventDefault();
		const { idCity, idRegion, idCountry } = this.props.locationState.local;
		const query: any = {
			search: this.state.searchString,
		};

		if (this.state.activeCategories.length > 0) {
			query.category = this.state.activeCategories[this.state.activeCategories.length - 1].id;
		}

		if (idCity) {
			query.city_id = idCity;
		} else if (idRegion) {
			query.region_id = idRegion;
		} else if (idCountry) {
			query.country_id = idCountry;
		}

		/* Router.push({
			pathname: '/search',
			query,
		}); */

		// alert(queryString.stringify(query));
		window.location.href = `/search?${ queryString.stringify(query) }`;
	}

	render() {
		return (
			<form action='#' onSubmit={this.onSubmit}>
				<div className='search form-inline form-row p-t-20'>
					<div className='form-group col-6 col-md-3'>
						<SelectCategories
							categories={this.props.categories}
							onSelect={this.onSelectCategory}
							label={'Category'}
							idDefaultCategory={this.props.idActiveCategory}
							parent={null}
						/>
					</div>
					<div className='form-group col-6 col-md-4'>
						<input
							className='search__options form-control'
							placeholder='Search'
							name='search'
							value={this.state.searchString}
							onChange={this.changeSearchString}
						/>
					</div>
					<div className='form-group col-6 col-md-3'>
						<input
							readOnly
							type='text'
							placeholder='Search'
							defaultValue={this.localeName}
							onClick={this.showSearchLocationModal}
							className='search__options form-control search_input--no-disable'
						/>
					</div>
					<div className='form-group col-12 col-md-2'>
						<button className='btn orange-btn-outline search__button' type='submit'>
							<i className='fas fa-search p-r-5'/>Search
						</button>
					</div>
				</div>
				{
					this.isSubcategories &&
					<div className='search form-inline form-row'>
						{
							this.subcategories.map(category => (
								category.children.length > 0
									? (
										<div key={category.id} className='form-group col-6 col-md-3'>
											<SelectCategories
												categories={category.children}
												onSelect={this.onSelectSubcategory}
												label={'Subcategory'}
												parent={category}
											/>
										</div>
									)
									: null
							))
						}
						{
							this.lastSubcategory &&
							this.lastSubcategory.total_options.map(option => (
								<div key={option.id} className='form-group col-6 col-md-3'>
									{getOption(option)}
								</div>
							))
						}
					</div>
				}
			</form>
		);
	}
}

export default connect(mapStateToProps)(getCategories(Search));