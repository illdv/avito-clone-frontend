import React, { Component } from 'react';

require('./SelectCategories.sass');

interface ISelectCategoryProps {
	label: string;
	parent: any;
	categories: any;
	idDefaultCategory?: number;
	onSelect: (category: any, parent: any | null) => void;
}

interface ISelectCategoriesState {
	value: number;
}

class SelectCategory extends Component<ISelectCategoryProps, ISelectCategoriesState> {

	constructor(props) {
		super(props);

		this.state = {
			value: this.labelId,
		};
	}

	get labelId() {
		return -1;
	}

	get modifyClass() {
		return this.state.value === -1 ? 'select--show-label' : '';
	}

	get isSelectedLabel() {
		return !!this.props.idDefaultCategory;
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
		console.log('idDefaultCategory = ', this.props.idDefaultCategory);
		return (
			<select
				name='categories'
				onClick={this.onSelect}
				className={`search__options form-control ${ this.modifyClass }`}
			>
				<option selected={this.isSelectedLabel} className='option-label' value={this.labelId} >
					{this.props.label}
				</option >
				{
					this.props.categories && this.props.categories.map(category => {
						const selected = comparison(category.id, this.props.idDefaultCategory);

						return (
							<option
								key={category.id}
								value={category.id}
								selected={selected}
							>
								{category.title}
							</option >
						);
					})
				}
			</select >
		);
	}
}

function comparison(one, two) {
	if (one && two) {
		return one.toString() === two.toString();
	}

	return false;
}

export default SelectCategory;
