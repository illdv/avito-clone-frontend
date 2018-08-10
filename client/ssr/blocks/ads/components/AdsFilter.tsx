import * as React from 'react';

interface IAdsFilter {
	selectFilter: (filter) => void;
	selectOrder: (filter) => void;

}

const SORT_CHANGE = [
	{ field: 'created_at', sort: 'desc', title: 'Default' },
	{ field: 'price', sort: 'desc', title: 'Expensive' },
	{ field: 'price', sort: 'asc', title: 'Cheap' },
];

const AdsFilter: React.SFC<IAdsFilter> = ({ selectFilter, selectOrder }) => {
	const handleChange = event => selectOrder(event.target.value);
	const handleClick  = (filter: string) => () => selectFilter(filter);
	return (
		<div className='row'>
			<div className='col-lg-6'>
				<div
					className='btn-group owner-type'
					role='group'
					aria-label='Basic example'
				>
					<button
						type='button'
						className='btn owner-type__button button_dark button_dark-outline active '
						onClick={handleClick('all')}
					>All
					</button>
					<button
						type='button'
						className='btn owner-type__button button_dark button_dark-outline '
						onClick={handleClick('personal')}
					>Personal
					</button>
					<button
						type='button'
						className='btn owner-type__button button_dark button_dark-outline '
						onClick={handleClick('company')}
					>Company
					</button>
				</div>
			</div>
			<div className='col-lg-6'>
				<div className='form-group d-flex justify-content-end'>
					<select
						name='categories'
						className='form-control w-25'
						onChange={handleChange}
						defaultValue='created_at'
					>
						{
							SORT_CHANGE.map(sort => {
							return <option
								value={JSON.stringify(sort)}
								key={sort.title}
							>{sort.title}</option>;
							})
						}
					</select>
				</div>
			</div>
		</div>
	);
};

export default AdsFilter;