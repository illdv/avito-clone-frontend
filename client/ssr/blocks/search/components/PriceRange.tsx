import * as React from 'react';
require('./PriceRange.sass');

interface IPriceRange {
	setPriceType: (priceType: string) => void;
	setPriceFrom: (priceFrom: string) => void;
	setPriceTo: (priceBefore: string) => void;
}

const PriceRange: React.SFC<IPriceRange> = ({ setPriceType, setPriceFrom, setPriceTo }) => {
	const handlePriceType = (event: React.FormEvent<HTMLSelectElement>) => {
		const priceType: string = event.currentTarget.value;
		setPriceType(priceType);
	};
	const handlePriceFrom =  (event: React.FormEvent<HTMLInputElement>) => {
		const priceFrom: string = event.currentTarget.value;
		setPriceFrom(priceFrom);
	};
	const handlePriceTo =  (event: React.FormEvent<HTMLInputElement>) => {
		const priceBefore: string = event.currentTarget.value;
		setPriceTo(priceBefore);
	};
	return (
		<div className='row '>
			<div className='col-lg-12 filters-panel'>
				<div className='filters-panel__item'>
					<select
						id='type'
						className='search__options form-control'
						onChange={handlePriceType}
					>
						<option
							value=''
							selected
						>Add Type
						</option>
						<option value='for-sale'>Sell</option>
						<option value='for-rent'>Rent</option>
						<option value='for-buy'>Buy now</option>
					</select>
				</div>

				<div className='form-group filters-panel__item'>
					<input
						type='text'
						placeholder='Price from $'
						className='search__options form-control'
						onChange={handlePriceFrom}
					/>
				</div>
				<div className='form-group filters-panel__item'>
					<input
						type='text'
						placeholder='To $'
						className='search__options form-control'
						onChange={handlePriceTo}
					/>
				</div>
			</div>
		</div>
	);
};

export default PriceRange;