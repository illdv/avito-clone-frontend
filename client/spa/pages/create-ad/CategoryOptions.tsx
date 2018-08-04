import React from 'react';
import { IOption } from './interface';

interface IProps {
	options: IOption[];
	creatorChangeOptionById(id: number): (e: any) => void;
}

class CategoryOptions extends React.Component<IProps> {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		if (this.props.options.length > 0) {
			return (
				<div className='container'>
					<br/>
					<h3>Options</h3>
					<div className='row'>
						{
							this.props.options.map(option => (
								<div key={option.item.id} className='form-group col-lg-4 col-sm-3'>
									<input
										type='text'
										value={option.value}
										placeholder={option.item.name}
										className='form-control'
										onChange={ this.props.creatorChangeOptionById(option.item.id) }
									/>
								</div>
							))
						}
					</div>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default CategoryOptions;