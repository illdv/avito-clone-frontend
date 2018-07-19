import React, { Component } from 'react';

interface SelectCategoryProps {
	label: string;
	parent: any;
	categories: any;
	onSelect: (category: any, parent: any|null) => void;
}

class SelectCategory extends Component<SelectCategoryProps> {

	onSelect = e => {
		const selectedCategory = this.props.categories.filter(category => {
			return category.id === Number(e.target.value);
		});

		this.props.onSelect(selectedCategory[0], this.props.parent);
	}

	render() {
		return (
			<select name='categories' className='search__options form-control' onChange={ this.onSelect }>
				<option disabled selected>{ this.props.label }</option>
				{
					this.props.categories.map(category => (
						<option key={ category.id } value={ category.id } >
							{ category.title }
						</option>
					))
				}
			</select>
		);
	}
}

export default SelectCategory;