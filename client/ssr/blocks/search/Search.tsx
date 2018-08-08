import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import SelectCategories from './components/SelectCategories';
import { IRootState } from 'client/common/store/storeInterface';
import { getLocationState } from 'client/common/store/selectors';
import { Category, getCategories } from 'client/ssr/blocks/categories/context';
import { ILocationStoreState } from 'client/common/location/module';

import { showLocationModal } from 'client/ssr/modals/location/locationModalTriggers';
import { ModalNames } from '../../../common/modal-juggler/modalJugglerInterface';
import PriceRange from 'client/ssr/blocks/search/components/PriceRange';
import { getQuery, IQuery } from 'client/ssr/contexts/QueryContext';
import { findCategoriesQueueById, useOrDefault } from 'client/spa/profile/utils/createAd';

require('./Search.sass');

interface ISearchProps {
	categories: Category;
	idActiveCategory: number;
	locationState: ILocationStoreState;
	priceRange?: boolean;
	query: IQuery;
}

interface IOption {
	value: string;
	item: ITotalOptions;
}

interface ISearchState {
	searchString: string;
	activeCategories: any;
	duplicateCategories: any;
	options: IOption[];
	rangePrice: {
		priceType: string;
		priceFrom: string;
		priceTo: string;
	};
}

const mapStateToProps = (state: IRootState) => ({
	locationState: getLocationState(state),
});

const getOption = (option: IOption, creatorChangeOption) => (
	<input
		className='search search__options form-control'
		value={option.value}
		placeholder={option.item.name}
		onChange={creatorChangeOption(option.item.id)}
	/>
);

class Search extends React.Component<ISearchProps, ISearchState> {
	constructor(props, context) {
		super(props, context);
		const query: any = this.props.query || {};
		const categoryId = useOrDefault(() => query.category_id, null)
		const categoriesQueue = categoryId && findCategoriesQueueById(this.props.categories, Number(categoryId)) || [];
		let options = [];

		if (categoriesQueue.length > 0) {
			const totalOptions = categoriesQueue[categoriesQueue.length - 1].total_options;
			totalOptions.forEach(option => {
				options.push({
					value: query && query.options[option.id] || '',
					item: option,
				});
			});
		}

		console.log(query);

		this.state = {
			duplicateCategories: this.props.categories,
			activeCategories: categoriesQueue,
			searchString: useOrDefault(() => query.whereLike.title, ''),
			options,
			rangePrice: {
				priceType: query.type || null,
				priceFrom: query.price_from || null,
				priceTo: query.price_to || null,
			},
		};

		console.log('this.state', this.state)
	}

	onSelectCategory = category => {
		if (category) {
			if (this.state.activeCategories[0] !== category) {
				this.setState({
					activeCategories: [category],
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
					options: this.getCorrectOptions(category),
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

	getCorrectOptions = (category: ICategory): IOption[] => {
		return category.total_options.map(option => ({
			value: '',
			item: option,
		}));
	}

	creatorChangeOption = (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const newOptions = this.state.options.map(option => {
			if (option.item.id === id) {
				return {
					value: e.target.value,
					item: option.item,
				};
			} else {
				return option;
			}
		});
		this.setState({
			options: newOptions,
		});
	}

	changeSearchString = e => {
		this.setState({
			searchString: e.target.value,
		});
	}

	showSearchLocationModal = () => showLocationModal(ModalNames.searchLocation);

	onSubmit = e => {
		e.preventDefault();
		const { idCity, idRegion, idCountry }                   = this.props.locationState.local;
		const { rangePrice: { priceType, priceFrom, priceTo } } = this.state;

		const query: any = {
			'whereLike[title]': this.state.searchString,
			'whereLike[body]': this.state.searchString,
			'whereLike[description]': this.state.searchString,
		};

		if (this.state.activeCategories.length > 0) {
			query.category_id = this.state.activeCategories[this.state.activeCategories.length - 1].id;
		}

		if (idCity) {
			query.city_id = idCity;
		} else if (idRegion) {
			query.region_id = idRegion;
		} else if (idCountry) {
			query.country_id = idCountry;
		}

		if (priceType && priceType.length > 0 ) {
			query.type = priceType;
		}

		if (priceFrom && priceFrom.length > 0) {
			query.price_from = priceFrom;
		}

		if (priceTo && priceTo.length > 0) {
			query.price_to = priceTo;
		}

		let optionsString = '';
		this.state.options.forEach(option => {
			if (option.value.length > 0) {
				optionsString += `&options[${option.item.id}]=${option.value}`;
			}
		});
		window.location.href = `/search?${queryString.stringify(query)}${optionsString.length > 1 ? optionsString : '' }`;
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

	onSetPriceType = (priceType: string) => {
		this.setState(({ rangePrice }) => ({ rangePrice: { ...rangePrice, priceType } }));
	}

	onSetPriceFrom = (priceFrom: string) => {
		this.setState(({ rangePrice }) => ({ rangePrice: { ...rangePrice, priceFrom } }));
	}

	onSetPriceTo = (priceTo: string) => {
		this.setState(({ rangePrice }) => ({ rangePrice: { ...rangePrice, priceTo } }));
	}

	get selectetCategoriesIds() {
		return this.state.activeCategories.map(category => category.id);
	}

	render() {
		const { priceRange } = this.props;

		return (
			<form
				action='#'
				onSubmit={this.onSubmit}
			>
				<div className='search form-inline form-row p-t-20' >
					<div className='form-group col-6 col-md-3' >
						<SelectCategories
							categories={this.props.categories}
							onSelect={this.onSelectCategory}
							label={'Category'}
							selectedCategoriesIds={this.selectetCategoriesIds}
							idDefaultCategory={useOrDefault(() => this.props.query.category_id, -1)}
							parent={null}
						/>
					</div >
					<div className='form-group col-6 col-md-4' >
						<input
							className='search__options form-control'
							placeholder='Search'
							name='search'
							value={this.state.searchString}
							onChange={this.changeSearchString}
						/>
					</div >
					<div className='form-group col-6 col-md-3' >
						<input
							readOnly
							type='text'
							placeholder='Search'
							defaultValue={this.localeName}
							onClick={this.showSearchLocationModal}
							className='search__options form-control search_input--no-disable'
						/>
					</div >
					<div className='form-group col-12 col-md-2' >
						<button
							className='btn orange-btn-outline search__button'
							type='submit'
						>
							<i className='fas fa-search p-r-5' />Search
						</button >
					</div >
				</div >
				{
					this.isSubcategories &&
					<div className='search form-inline form-row' >
						{
							this.subcategories.map(category => (
								category.children.length > 0
									? (
										<div
											key={category.id}
											className='form-group col-6 col-md-3'
										>
											<SelectCategories
												currentCategory={category}
												categories={category.children}
												selectedCategoriesIds={this.selectetCategoriesIds}
												idDefaultCategory={useOrDefault(() => this.props.query.category_id, -1)}
												onSelect={this.onSelectSubcategory}
												label={'Subcategory'}
												parent={category}
											/>
										</div >
									)
									: null
							))
						}
						{
							this.lastSubcategory &&
							this.state.options.map(option => (
								<div
									key={option.item.id}
									className='form-group col-6 col-md-3'
								>
									{getOption(option, this.creatorChangeOption)}
								</div >
							))
						}
					</div >
				}
				{
					priceRange
						?
						<PriceRange
							type={this.state.rangePrice.priceType}
							from={this.state.rangePrice.priceFrom}
							to={this.state.rangePrice.priceTo}
							setPriceType={this.onSetPriceType}
							setPriceFrom={this.onSetPriceFrom}
							setPriceTo={this.onSetPriceTo}
						/>
						: null
				}
			</form >
		);
	}
}

export default connect(mapStateToProps)(getQuery(getCategories(Search)));