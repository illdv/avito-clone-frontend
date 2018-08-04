import React, { Component } from 'react';
import { IControlButtonsProps } from 'client/spa/profile/interfaces/controlButtons';

class ControlButtons extends Component<IControlButtonsProps> {

	render() {
		return (
			<div className='remove-offer'>
				<input type='checkbox' className='custom-checkbox'/>
				<a className='btn orange-btn-outline publish-offer__button'>Active</a>
				<a className='btn grey-btn-outline publish-offer__button'>Remove</a>
			</div>
		);
	}
}
export default ControlButtons;