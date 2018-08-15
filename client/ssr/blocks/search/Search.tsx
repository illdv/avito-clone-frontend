import React from 'react';
import { connect } from 'react-redux';

import SelectCategories from './components/SelectCategories';
import { IRootState } from 'client/common/store/storeInterface';
import { getLocationState } from 'client/common/store/selectors';
import { Category, getCategories } from 'client/ssr/blocks/categories/context';
import { changeCountryLocal, ILocationStoreState } from 'client/common/location/module';

import { showLocationModal } from 'client/ssr/modals/location/locationModalTriggers';
import { ModalNames } from '../../../common/modal-juggler/modalJugglerInterface';
import PriceRange, { IRangePrice } from 'client/ssr/blocks/search/components/PriceRange';
import { findCategoriesQueueById, useOrDefault } from 'client/spa/profile/utils/createAd';
import { pushInRouter } from 'client/common/utils/utils';
import { IQuery } from 'client/common/search/interface';
import { queryStringifyPlus } from 'server/router/utils';

require('./Search.sass');

/**
 * Delete all value equal null, undefined or empty string.
 */
function clearObject(dirtyObject) {
	return Object.entries(dirtyObject).reduce((result, [key, value]) => {
		if (!value || value === '') {
			return result;
		}
		if (typeof value === 'object' && !Array.isArray(value)) {
			return { ...result, [key]: clearObject(value) };
		}
		return { ...result, [key]: value };
	}, {});
}

interface IOption {
	value: string;
	item: ITotalOptions;
}

interface IProps {
	onSearch: () => void;
	query: IQuery;
	locationName: string;
	urlString: string;
	categories: Category;
	idActiveCategory: number;
	locationState: ILocationStoreState;
	priceRange?: boolean;
}

interface IState {
	urlString: string;
	searchString: string;
	selectedCategories: any;
	duplicateCategories: any;
	options: IOption[];
	locationName: string;
	rangePrice: {
		priceType: number;
		priceFrom: number;
		priceTo: number;
	};
}

const mapStateToProps = (state: IRootState) => ({
	locationState: getLocationState(state),
});

const getOption = (option: IOption, creatorChangeOption) => (
	<>
		<label htmlFor={option.item.name} >
			{option.item.name.replace('_', ' ')}
		</label >
		<input
			className='search__options form-control'
			id={option.item.name}
			value={option.value}
			placeholder={option.item.name}
			onChange={creatorChangeOption(option.item.id)}
		/>
	</>
);

class Search extends React.Component<IProps, IState> {
	constructor(props, context) {
		super(props, context);
	}

	state: IState = {
		urlString: '',
		searchString: '',
		rangePrice: {
			priceType: null,
			priceTo: null,
			priceFrom: null,
		},
		locationName: 'World',
		options: [],
		duplicateCategories: [],
		selectedCategories: [],
	};

	static getDerivedStateFromProps(nextProps: IProps, prevState: IState): IState {
		const { urlString, query, categories, locationName } = nextProps;
		const { whereLike }                    = query;

		const options = [];

		if (urlString !== prevState.urlString) {
			const categoryId      = query.category_id;
			const categoriesQueue = categoryId && findCategoriesQueueById(categories, Number(categoryId)) || [];

			if (categoriesQueue.length > 1) {
				const totalOptions = categoriesQueue[categoriesQueue.length - 1].total_options;
				totalOptions.forEach(option => {
					options.push({
						value: query && query.options[option.id] || '',
						item: option,
					});
				});
			}

			return {
				locationName,
				urlString,
				searchString: whereLike.title,
				selectedCategories: categoriesQueue,
				duplicateCategories: categories,
				options,
				rangePrice: {
					priceType: query.type || null,
					priceFrom: useOrDefault(() => query.whereBetween.price[0], null),
					priceTo: useOrDefault(() => query.whereBetween.price[1], null),
				},
			};
		}
		return null;
	}

	onSelectCategory = category => {
		if (category) {
			if (this.state.selectedCategories[0] !== category) {
				this.setState({
					selectedCategories: [category],
					options: [],
				});
			}
		} else {
			this.setState({ selectedCategories: [], options: [] });
		}
	}

	onSelectSubcategory = (category, parent) => {
		const categories = this.state.selectedCategories;

		const indexParent = categories.indexOf(parent);

		if (category) {
			if (indexParent !== -1) {
				const newCategories = categories.slice(0, indexParent + 1);
				newCategories.push(category);

				this.setState({
					selectedCategories: newCategories,
					options: this.getCorrectOptions(category),
				});
			} else {
				throw new Error('Parent no found');
			}
		} else {
			const newCategories = categories.slice(0, indexParent + 1);
			this.setState({
				selectedCategories: newCategories,
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

	showSearchLocationModal = () => showLocationModal(ModalNames.location);

	getIdSelectedCategory = () => {
		const { selectedCategories } = this.state;

		if (selectedCategories.length > 0) {
			return selectedCategories[selectedCategories.length - 1].id;
		}
		return null;
	}

	getSelectedRange = () => {
		const { rangePrice }         = this.state;
		const { priceFrom, priceTo } = rangePrice;

		return {
			price: [
				priceFrom,
				priceTo,
			],
		};
	}

	getSelectedOptions = () => {
		const { options } = this.state;

		return options.map(option => ({
			[option.item.id]: option.value,
		}));
	}

	onSubmit = e => {
		e.preventDefault();

		const { idCity, idRegion, idCountry } = this.props.locationState.local;
		const { rangePrice, searchString }    = this.state;
		const { priceType }                   = rangePrice;

		const idSelectedCategory = this.getIdSelectedCategory();
		const whereBetween       = this.getSelectedRange();
		const selectedOptions    = this.getSelectedOptions();

		const query: any = {
			whereLike: {
				title: searchString,
				body: searchString,
				description: searchString,
			},
			category_id: idSelectedCategory,
			city_id: idCity,
			region_id: idRegion,
			country_id: idCountry,
			type: priceType,
			whereBetween,
			...selectedOptions,
		};

		const clearQuery  = clearObject(query);
		const queryParams = queryStringifyPlus(clearQuery);
		const href        = `/search?${queryParams}`;

		pushInRouter(href);
	}

	get subcategories() {
		return this.state.selectedCategories;
	}

	get isSubcategories() {
		return this.subcategories.length > 0;
	}

	get categories() {
		return this.state.selectedCategories;
	}

	get lastSubcategory() {
		return this.state.selectedCategories[this.state.selectedCategories.length - 1];
	}

	onChangeRange = ({ type, to, from }: IRangePrice) => {
		this.setState({
			rangePrice: {
				priceType: type,
				priceTo: to,
				priceFrom: from,
			},
		});
	}

	get selectedCategoriesIds() {
		return this.state.selectedCategories.map(category => category.id);
	}

	renderLineSearch = () => {
		return (
			<div className='search form-inline form-row p-t-20' >
				<div className='form-group col-6 col-md-3' >
					<SelectCategories
						categories={this.props.categories}
						onSelect={this.onSelectCategory}
						label={'Category'}
						selectedCategoriesIds={this.selectedCategoriesIds}
						idDefaultCategory={this.props.query.category_id}
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
						defaultValue={this.props.locationName}
						onClick={this.showSearchLocationModal}
						className='search__options form-control search_input--no-disable'
					/>
				</div >
				<div className='form-group col-12 col-md-2' >
					<button
						className='btn orange-btn-outline search__button'
						type='submit'
					>
						<i className='fas fa-search p-r-5' />
						Search
					</button >
				</div >
			</div >
		);
	}

	renderSubcategories = () => {
		if (this.isSubcategories) {
			return (
				<div className='search form-inline form-row' >
					{
						this.subcategories.map(category => (
							category.children.length > 0
								?
								<>
									<div
										key={category.id}
										className='form-group col-6 col-md-3'
									>
										<label htmlFor='' >
											Sub-Category
										</label >
										<SelectCategories
											currentCategory={category}
											categories={category.children}
											selectedCategoriesIds={this.selectedCategoriesIds}
											idDefaultCategory={useOrDefault(() => this.props.query.category_id, -1)}
											onSelect={this.onSelectSubcategory}
											label={'Subcategory'}
											parent={category}
										/>
									</div >
								</>
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
			);
		}

		return null;
	}

	render() {
		const { priceRange } = this.props;

		const { rangePrice: { priceType, priceTo, priceFrom } } = this.state;

		const range: IRangePrice = {
			type: priceType,
			to: priceTo,
			from: priceFrom,
		};

		return (
			<form
				action='#'
				onSubmit={this.onSubmit}
			>
				{this.renderLineSearch()}
				{this.renderSubcategories()}
				{
					priceRange
						?
						<PriceRange
							range={range}
							onChangeRange={this.onChangeRange}
						/>
						: null
				}
			</form >
		);
	}
}

export default connect(mapStateToProps)(getCategories(Search));