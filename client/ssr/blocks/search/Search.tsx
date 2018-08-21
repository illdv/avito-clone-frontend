import React from 'react';
import { connect } from 'react-redux';

import SelectCategories from './components/SelectCategories';
import { IRootState } from 'client/common/store/storeInterface';
import { Category, getCategories } from 'client/ssr/blocks/categories/context';

import { showLocationModal } from 'client/ssr/modals/location/locationModalTriggers';
import { ModalNames } from '../../../common/modal-juggler/modalJugglerInterface';
import PriceRange, { IRange } from 'client/ssr/blocks/search/components/PriceRange';
import { findCategoriesQueueById, useOrDefault } from 'client/spa/profile/utils/createAd';
import { IQuery } from 'client/common/search/interface';
import { default as Options, IOption } from 'client/ssr/blocks/search/Options';
import { bindingOptionsWhitValue } from 'client/ssr/blocks/search/utils';

require('./Search.sass');

export interface IRangePrice {
	priceType: number | null;
	priceFrom: number | null;
	priceTo: number | null;
}

export interface IDataForSearch {
	rangePrice: IRangePrice;
	searchString: string;
	options: IOption[];
	selectedCategories: any;
}

interface IProps {
	onSearch: (data: IDataForSearch) => void;
	query: IQuery;
	locationName: string;
	urlString: string;
	categories: Category;
	idActiveCategory: number;
	priceRange?: boolean;
}

interface IState {
	urlString: string;
	searchString: string;
	selectedCategories: any;
	duplicateCategories: any;
	options: IOption[];
	locationName: string;
	rangePrice: IRangePrice;
}

const mapStateToProps = (state: IRootState) => ({});

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

	static defaultProps = {
		query: {
			country_id: null,
			region_id: null,
			city_id: null,
			currentPage: null,
			price_from: null,
			whereBetween: {
				price: [],
			},
			whereLike: {
				body: '',
				description: '',
				title: '',
			},
		},
		categories: [],
	};

	static getDerivedStateFromProps(nextProps: IProps, prevState: IState): IState {
		const { urlString, categories, query, locationName } = nextProps;

		const { whereLike, category_id, options } = query;

		if (urlString !== prevState.urlString) {

			const categoriesQueue = category_id && findCategoriesQueueById(categories, Number(category_id)) || [];

			const bindingOptions = bindingOptionsWhitValue(categoriesQueue, options);

			return {
				locationName,
				urlString,
				searchString: whereLike.title,
				selectedCategories: categoriesQueue,
				duplicateCategories: categories,
				options: bindingOptions,
				rangePrice: {
					priceType: query.type_id || null,
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

	changeSearchString = e => {
		this.setState({
			searchString: e.target.value,
		});
	}

	showSearchLocationModal = () => showLocationModal(ModalNames.searchLocation);

	get subcategories() {
		return this.state.selectedCategories;
	}

	get isSubcategories() {
		return this.subcategories.length > 0;
	}

	get categories() {
		return this.state.selectedCategories;
	}

	onChangeRange = ({ type, to, from }: IRange) => {
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

		const { searchString } = this.state;

		const { query, categories, locationName } = this.props;

		return (
			<div className='search form-inline form-row p-t-20' >
				<div className='form-group col-6 col-md-3' >
					<SelectCategories
						categories={categories}
						onSelect={this.onSelectCategory}
						label={'Category'}
						selectedCategoriesIds={this.selectedCategoriesIds}
						idDefaultCategory={query.category_id}
						parent={null}
					/>
				</div >
				<div className='form-group col-6 col-md-4' >
					<input
						className='search__options form-control'
						placeholder='Search'
						name='search'
						value={searchString}
						onChange={this.changeSearchString}
					/>
				</div >
				<div className='form-group col-6 col-md-3' >
					<input
						readOnly
						type='text'
						placeholder='Search'
						defaultValue={locationName}
						onClick={this.showSearchLocationModal}
						className='search__options form-control search_input--no-disable'
					/>
				</div >
				<div className='form-group col-12 col-md-2' >
					<button
						className='btn orange-btn-outline search__button'
						onClick={this.onSearch}
					>
						<i className='fas fa-search p-r-5' />
						Search
					</button >
				</div >
			</div >
		);
	}

	onChangeOptions = (options: IOption[]) => {
		this.setState({
			options,
		});
	}

	renderSubcategories = () => {
		if (this.isSubcategories) {

			const { options, selectedCategories } = this.state;

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
					<Options
						options={options}
						selectedCategories={selectedCategories}
						onChange={this.onChangeOptions}
					/>
				</div >
			);
		}

		return null;
	}

	onSearch = () => {
		const { selectedCategories, options, rangePrice, searchString } = this.state;

		this.props.onSearch({
			selectedCategories,
			options,
			rangePrice,
			searchString,
		});
	}

	render() {
		const { priceRange } = this.props;

		const { rangePrice: { priceType, priceTo, priceFrom } } = this.state;

		const range: IRange = {
			type: priceType,
			to: priceTo,
			from: priceFrom,
		};

		return (
			<>
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
			</>
		);
	}
}

export default connect(mapStateToProps)(getCategories(Search));