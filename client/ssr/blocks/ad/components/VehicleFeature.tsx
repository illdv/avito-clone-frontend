import React, { Component } from 'react';

export interface IVehicleFeature {
	options: object;
}

class VehicleFeature extends Component<IVehicleFeature, {}> {
	render() {
		return (
			<div className='col-lg-5'>
				<h3 className='caption'>Vehicle Features</h3>

				<ul
					className='list-unstyled f-s-14 ads-features'
				>
					{listItems(this.props.options)}
				</ul>
			</div>
		);
	}
}

function listItems(options) {
	return options.map(option =>
		formationOptions(option),
	);
}

function formationOptions(option) {
	const key = option.name.replace('_', ' ');

	return (
		<li key={key}>
			<span className='grey-text'>{key}</span>: <span>{option.pivot.value}</span>
		</li>
	);
}

export default VehicleFeature;