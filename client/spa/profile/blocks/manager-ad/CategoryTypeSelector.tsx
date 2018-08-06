import React from 'react';

const mockTypesLabelsById = {
	1: 'For Sale',
	2: 'For Buy',
	3: 'For Rent',
}

interface IProps {
	selectedType: number;
	typeIds: number[];
	onSelectTypeAd(id: number): void;
}

class SelectorAdType extends React.Component<IProps> {
	
	onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		this.props.onSelectTypeAd(Number(e.target.value));
	}

	render() {
		return (
			<div className='container'>
				<br />
				<h3>
					Type
				</h3>
				<div className='form-group col-lg-4 col-sm-3'>
					<select onChange={ this.onChange } className='form-control' >
						{
							this.props.typeIds.map(id => (
								<option
									key={id}
									value={String(id)}
									selected={ id === this.props.selectedType }
								>
									{ mockTypesLabelsById[id] }
								</option>
							))
						}
					</select>
				</div>
			</div>
		);
	}
}

export default SelectorAdType;