import * as React from 'react';
import { Component } from 'react';

export interface IState {

}

export interface IProps {
	selectedCategories: ICategory[];
	options: IOption[];
	onChange: (option: IOption[]) => void;
}

export interface IOption {
	value: string;
	item: ITotalOptions;
}

class Options extends Component<IProps, IState> {

	state: IState = {};

	getLastSubcategory() {
		const categories = this.props.selectedCategories;
		return categories[categories.length - 1];
	}

	onChangeOption = (option: IOption) => (e: React.ChangeEvent<HTMLInputElement>) => {

		const value = e.target.value;

		const { onChange, options } = this.props;

		const newOptions = options.reduce((acc, item: IOption) => {

			if (item.item.id === option.item.id) {
				return [...acc, {
					...item,
					value,
				}];
			}

			return [...acc, item];
		}, []);

		onChange(newOptions);
	}

	render() {
		return (
			<>
				{
					this.getLastSubcategory() &&
					this.props.options.map(option => (
						<div
							key={option.item.id}
							className='form-group col-6 col-md-3'
						>
							<label htmlFor={option.item.name} >
								{option.item.name.replace('_', ' ')}
							</label >
							<input
								className='search__options form-control'
								id={option.item.name}
								value={option.value}
								placeholder={option.item.name}
								onChange={this.onChangeOption(option)}
							/>
						</div >
					))
				}
			</>
		);
	}
}

export default Options;