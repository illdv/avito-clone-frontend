import React, { ChangeEvent, Component } from 'react';
import { ISimilarAdsState } from 'client/ssr/blocks/ad/interface';

export interface IProps {
	sort: (e: ChangeEvent<HTMLInputElement>) => void;
}

const OptionOrderBy = ({filter}) => (
	<option
		value={filter}
	>
		{filter.toUpperCase()}
	</option>
);

class SimilarSortedBy extends Component<IProps, ISimilarAdsState> {
	state = {
		filter: '',
	};

	changeOrderBy = (e) => {
		this.props.sort(e);
	}

	render() {
		const sortFields = ['new', 'price'];
		const { filter } = this.state;
		return (
			<div className='col-md-12 col-lg-6'>
				<select
					name='similar'
					id='similar'
					className='form-control'
					onChange={this.changeOrderBy}
					defaultValue={filter}
				>
					<option
						value={filter}
						hidden
					>Sort by
					</option>
					{
						sortFields.map(sort => (
							<OptionOrderBy filter={sort} key={sort}/>
						))
					}
				</select>
			</div>
		);
	}
}

export default SimilarSortedBy;