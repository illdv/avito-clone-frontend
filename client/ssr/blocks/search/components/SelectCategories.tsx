import React, { Component } from 'react';

require('./SelectCategories.sass');

interface SelectCategoryProps {
	label: string;
	parent: any;
	categories: any;
	idDefaultCategory?: number;
	onSelect: (category: any, parent: any|null) => void;
}

interface SelectCategoriesState {
	value: number;
	containDefaulCategory: boolean;
}

class SelectCategory extends Component<SelectCategoryProps, SelectCategoriesState> {

	constructor(props) {
		super(props);

		this.state = {
			value: this.labelId,
			containDefaulCategory: this.isConteinDefaultCategory,
		};
	}

	get labelId() {
		return -1;
	}

	get modifyClass() {
		return this.state.value === -1 ? 'select--show-label' : '';
	}

	get isSelectedLabel() {
		return !this.state.containDefaulCategory;
	}

	get isConteinDefaultCategory() {
		if (this.props.idDefaultCategory) {
			return this.props.categories.some(category => {
				return category.id === this.props.idDefaultCategory;
			});
		} else {
			return false;
		}
	}

	checkCategoryIsDefault = category => {
		if (this.state.containDefaulCategory) {
			return category.id === this.props.idDefaultCategory;
		}
		return false;
	}

	onSelect = e => {
		const value = Number(e.target.value);
	
		this.setState({ value });

		if (this.labelId === value) {
			return this.props.onSelect(null, this.props.parent);
		}

		const selectedCategory = this.props.categories.filter(category => {
			return category.id === value;
		});

		this.props.onSelect(selectedCategory[0], this.props.parent);
	}

	render() {
		return (
			<select
				name='categories'
				onClick={ this.onSelect }
				className={`search__options form-control ${ this.modifyClass }`}
			>
				<option selected={ this.isSelectedLabel } className='option-label' value={ this.labelId }>
					{ this.props.label }
				</option>
				{
					this.props.categories.map(category => (
						<option
							key={ category.id }
							value={ category.id }
							selected={ this.checkCategoryIsDefault(category) }
						>
							{ category.title }
						</option>
					))
				}
			</select>
		);
	}
}

export default SelectCategory;