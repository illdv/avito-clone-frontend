import React, { Component } from 'react';
import { connect, Dispatch } from 'react-redux';

import SelectCategories from './components/SelectCategories';
import { IRootState } from 'client/common/store/storeInterface';
import { getLocationState } from 'client/common/store/selectors';
import { getCategories, Category } from 'client/ssr/blocks/categories/context';
import { ILocationStoreState } from 'client/common/location/module';

import { showSearchLocationModal } from 'client/ssr/modals/search-location/SearchLocationModalTriggers';

require('./Search.sass');

interface SearchProps {
	categories: Category;
	idActiveCategory: number;
	locationState: ILocationStoreState;
}

const mapStateToProps = (state: IRootState) => ({
	locationState: getLocationState(state),
	user: state.user,
});

const getOption = option => (
	<input name='name' className='search search__options form-control' placeholder={option.name} />
);

class Search extends Component<SearchProps> {
	constructor(props, context) {
		super(props, context);
	}

	state = {
		duplicateCategories: this.props.categories,
		activeCategories: [],
	};

	onSelectCategory = category => {
		if (category) {
			if (this.state.activeCategories[0] !== category) {
				this.setState({
					activeCategories: [ category ],
				});
			}
		} else {
			this.setState({ activeCategories: [] });
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
					return region.region_id = idRegion;
				});
				if (result.length > 0) {
					return result[0].title; 
				}
			}
		}

		if (idCountry) {
			if (this.props.locationState.loaded.local.countries.length > 0) {
				const result = this.props.locationState.loaded.local.countries.filter(country => {
					return country.country_id = idCountry;
				});
				if (result.length > 0) {
					return result[0].title; 
				}
			}
		}

		return 'World';
	}

	render() {
		return (
			<div>
				<form action='#'>
					<div className='row align-items-center p-y-22'>
						<div className='col-md-12'>
							<div className='search form-inline form-row'>
								<div className='form-group col-6 col-md-3'>
									<SelectCategories
										categories={ this.props.categories }
										onSelect={ this.onSelectCategory }
										label={ 'Category' }
										idDefaultCategory={this.props.idActiveCategory}
										parent={ null }
									/>
								</div>
								<div className='form-group col-6 col-md-4'>
									<input type='text' className='search__options form-control' placeholder='Search' name='search'/>
								</div>
								<div className='form-group col-6 col-md-3'>
									<input
										type='text'
										name='city'
										placeholder='Search'
										defaultValue={this.localeName}
										className='search__options form-control'
										onClick={showSearchLocationModal}
									/>
								</div>
								<div className='form-group col-12 col-md-2'>
									<button className='btn orange-btn-outline search__button' type='submit'>
										<i className='fas fa-search p-x-5'/>Search
									</button>
								</div>
							</div>
						</div>
					</div>
					{
						this.isSubcategories &&
						<div className='row align-items-center'>
							<div className='col-md-12'>
								<div className='search form-inline form-row'>
									{
										this.subcategories.map(category => (
											category.children.length > 0
												? (
													<div key={ category.id } className='form-group col-6 col-md-3 p-b-22'>
														<SelectCategories
															categories={ category.children }
															onSelect={ this.onSelectSubcategory }
															label={ 'Subcategory' }
															parent={ category }
														/>
													</div>
												)
												: null
											
										))
									}
									{
										this.lastSubcategory &&
										this.lastSubcategory.total_options.map(option => (
											<div key={option.id} className='form-group col-6 col-md-3 p-b-22'>
												{ getOption(option) }
											</div>
										))
									}
								</div>
							</div>
						</div>
					}
				</form>
			</div>
		);
	}
}

export default connect(mapStateToProps)(getCategories(Search));