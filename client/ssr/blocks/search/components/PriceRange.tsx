import * as React from 'react';

require('./PriceRange.sass');

export interface IRange {
	to: number;
	type: number;
	from: number;
}

interface IPriceRange {
	range: IRange;
	onChangeRange: (newRange: IRange) => void;
}

const checkSelected = (value, selected) => {
	return value === selected;
};

const ifNullReturnDefault = (value: number | null, defaultValue: string) => {
	return value === null ? defaultValue : value;
};

const PriceRange: React.SFC<IPriceRange> = ({ range, onChangeRange }) => {

	const onChangePrice = (event: React.FormEvent<HTMLInputElement | HTMLSelectElement>) => {
		const newValue: number = Number(event.currentTarget.value);
		onChangeRange({
			...range,
			[event.currentTarget.id]: newValue,
		});
	};

	const { type, to, from } = range;

	return (
		<div className='search form-inline form-row' >
			<div className='form-group col-6 col-md-3' >
				<label htmlFor='type' >Add Type</label >
				<select
					id='type'
					className='search__options form-control'
					onChange={onChangePrice}
				>
					<option
						value=''
						selected
					>
						Add Type
					</option >
					<option value='1' selected={checkSelected('1', type)} >Sell</option >
					<option value='2' selected={checkSelected('2', type)} >Rent</option >
					<option value='3' selected={checkSelected('3', type)} >Buy now</option >
				</select >
			</div >

			<div className='form-group col-6 col-md-3' >
				<label htmlFor='priceFrom' >Price From</label >
				<input
					id='from'
					type='number'
					value={ifNullReturnDefault(from, '')}
					placeholder='Price from $'
					className='search__options form-control'
					onChange={onChangePrice}
				/>
			</div >
			<div className='form-group col-6 col-md-3' >
				<label htmlFor='priceTo' >Price To</label >
				<input
					id='to'
					type='number'
					value={ifNullReturnDefault(to, '')}
					placeholder='To $'
					className='search__options form-control'
					onChange={onChangePrice}
				/>
			</div >
		</div >
	);
};

export default PriceRange;