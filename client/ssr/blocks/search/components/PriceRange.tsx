import * as React from 'react';
require('./PriceRange.sass');

interface IPriceRange {
	to: number;
	type: number;
	from: number;
	setPriceType: (priceType: number) => void;
	setPriceFrom: (priceFrom: number) => void;
	setPriceTo: (priceBefore: number) => void;
}

const checkSelected = (value, selected) => {
	return value === selected;
};

const PriceRange: React.SFC<IPriceRange> = ({ to, type, from, setPriceType, setPriceFrom, setPriceTo }) => {
	const handlePriceType = (event: React.FormEvent<HTMLSelectElement>) => {
		const priceType: number = Number(event.currentTarget.value);
		setPriceType(priceType);
	};
	const handlePriceFrom =  (event: React.FormEvent<HTMLInputElement>) => {
		const priceFrom: number = Number(event.currentTarget.value);
		setPriceFrom(priceFrom);
	};
	const handlePriceTo =  (event: React.FormEvent<HTMLInputElement>) => {
		const priceBefore: number = Number(event.currentTarget.value);
		setPriceTo(priceBefore);
	};
	return (
		<div className='search form-inline form-row'>
			<div className='form-group col-6 col-md-3'>
				<label htmlFor='type'>Add Type</label>
				<select
					id='type'
					className='search__options form-control'
					onChange={handlePriceType}
				>
					<option
						value=''
						selected
					>
						Add Type
					</option>
					<option value='for-sale' selected={checkSelected('for-sale', type)}>Sell</option>
					<option value='for-rent' selected={checkSelected('for-rent', type)}>Rent</option>
					<option value='for-buy' selected={checkSelected('for-buy', type)}>Buy now</option>
				</select>
			</div>

			<div className='form-group col-6 col-md-3'>
				<label htmlFor='priceFrom'>Price From</label>
				<input
					id='priceFrom'
					type='number'
					value={from || ''}
					placeholder='Price from $'
					className='search__options form-control'
					onChange={handlePriceFrom}
				/>
			</div>
			<div className='form-group col-6 col-md-3'>
				<label htmlFor='priceTo'>Price To</label>
				<input
					id='priceTo'
					type='number'
					value={to || ''}
					placeholder='To $'
					className='search__options form-control'
					onChange={handlePriceTo}
				/>
			</div>
		</div>
	);
};

export default PriceRange;