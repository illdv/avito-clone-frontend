import React, {Component} from 'react';
import {IVehicleFeature} from 'client/ssr/blocks/ad/interface';

class Feature extends Component<IVehicleFeature> {
	render() {
		return (
			<div className='col-lg-5'>
				{/*<h3 className='caption'>Vehicle Features</h3>*/}
				<h3>Features</h3>
				<ul className='ads-features'>
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
		<li key={option.id}>
			<span className='grey-text'>{key}:</span> {option.pivot.value}
		</li>
	);
}

export default Feature;