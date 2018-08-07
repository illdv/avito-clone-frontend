import React, { Component } from 'react';
import { ISimilarAdsState } from 'client/ssr/blocks/ad/interface';

class SimilarSortedBy extends Component<any, ISimilarAdsState> {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			filter: '',
		};
	}

	handleChange(e) {
		this.props.sort(e.target.value);
	}

	render() {
		const filters = ['new', 'price'];
		return (
			<div className='col-md-12 col-lg-6'>
				<select
					name='similar'
					id='similar'
					className='form-control'
					onChange={this.handleChange}
					defaultValue={this.state.filter}
				>
					<option
						value={this.state.filter}
						hidden
					>Sort by
					</option>
					{filters.map((filter) => {
						return (
							<option
								value={filter}
								key={filter}
							>
								{filter.toUpperCase()}
							</option>
						);
					})}
				</select>
			</div>
		)
	}
}

export default SimilarSortedBy;