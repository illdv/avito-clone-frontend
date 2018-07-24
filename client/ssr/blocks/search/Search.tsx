import React, {Component} from 'react';
import SelectCategories from './components/SelectCategories';
import {getCategories, Category} from 'client/ssr/blocks/categories/context';

require('./Search.sass');

interface SearchProps {
	categories: Category;
	idActiveCategory: number;
}

const getOption = option => (
	<input name='name' className='search search__options form-control' placeholder={option.name}/>
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
					activeCategories: [category],
				});
			}
		} else {
			this.setState({activeCategories: []});
		}
	};

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

	};

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

	render() {
		return (
			<form action='#'>
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
					<div className='form-group col-6 col-md-3'>
						<input
							type='text'
							className='search__options form-control'
							placeholder='Search'
							name='search'
						/>
					</div>
					<div className='form-group col-6 col-md-2'>
						<select name='country' className='search__options form-control'>
							<option value=''>Germany</option>
							<option value=''>United Arab Emirates</option>
							<option value=''>Kuwait</option>
							<option value=''>Other</option>
						</select>
					</div>
					<div className='form-group col-6 col-md-2'>
						<select name='city' className='search__options form-control'>
							<option value=''>Berlin</option>
							<option value=''>Dubai</option>
							<option value=''>Moscow</option>
						</select>
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

export default getCategories(Search);