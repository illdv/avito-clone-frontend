import React from 'react';
import {IOption} from './interface';

interface IProps {
	options: IOption[];

	creatorChangeOptionById(id: number): (e: any) => void;
}

class CategoryOptions extends React.Component<IProps> {
	render() {
		if (this.props.options.length > 0) {
			return (
				<div className='container'>
					<br/>
					<h3>Options</h3>
					<div className='row search'>
						{
							this.props.options.map(option => (
								<div key={option.item.id} className='form-group col-lg-4 col-sm-3'>
									<label htmlFor={option.item.name}>{option.item.name.replace('_', ' ')}</label>
									<input
										type='text'
										id={option.item.name}
										value={option.value}
										placeholder={option.item.name}
										className='form-control'
										onChange={this.props.creatorChangeOptionById(option.item.id)}
									/>
								</div>
							))
						}
					</div>
				</div>
			);
		}

		return null;
	}
}

export default CategoryOptions;