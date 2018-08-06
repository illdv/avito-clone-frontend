import * as React from 'react';
require('./PriceRange.sass');

interface IPriceRange {
}

const PriceRange: React.SFC<IPriceRange> = ({ }) => {
	const handlePriceType = (event: React.FormEvent<HTMLSelectElement>) => {
		const priceType: string = event.currentTarget.value;
		console.log('priceType', priceType);
	};
	const handlePriceFrom =  (event: React.FormEvent<HTMLInputElement>) => {
		const priceFrom: string = event.currentTarget.value;
		console.log('handlePriceFrom', event.currentTarget.value);
	};
	const handlePriceBefore =  (event: React.FormEvent<HTMLInputElement>) => {
		const priceBefore: string = event.currentTarget.value;
		console.log('handlePriceBefore', typeof event.currentTarget.value  );
	};
	return (
		<div className='row '>
			<div className='col-lg-12 filters-panel'>
				<div className='form-group filters-panel__item'>
					<select
						id='type'
						className='form-control'
						onChange={handlePriceType}
					>
						<option
							value='Sell'
							selected
						>Add Type
						</option>
						<option value='Sell'>Sell</option>
						<option value='Rent'>Rent</option>
						<option value='Buy'>Buy now</option>
					</select>
				</div>

				<div className='form-group filters-panel__item'>
					<input
						type='text'
						placeholder='Price from $'
						className='form-control'
						onChange={handlePriceFrom}
					/>
				</div>
				<div className='form-group filters-panel__item'>
					<input
						type='text'
						placeholder='Before $'
						className='form-control'
						onChange={handlePriceBefore}
					/>
				</div>
			</div>
		</div>
	);
};

export default PriceRange;