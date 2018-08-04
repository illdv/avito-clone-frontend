import React, { Component } from 'react';
import { IControlButtonsProps, IControlButtonsState } from 'client/spa/profile/interfaces/controlButtons';

class ControlButtons extends Component<IControlButtonsProps, IControlButtonsState> {
	constructor(props) {
		super(props);

		this.state = {
			ids: this.initialState,
		};
	};

	get initialState() {
		return this.props.ads.items.map(item => {
			return item.id;
		});
	}

	render() {
		return (
			<div className='remove-offer'>
				<input type='checkbox' className='custom-checkbox' onChange={this.selectAllAds}/>
				<a className='btn orange-btn-outline publish-offer__button'>Active</a>
				<a className='btn grey-btn-outline publish-offer__button'>Remove</a>
			</div>
		);
	}

	selectAllAds = () => {
		this.props.selected(this.state.ids);
	}

}
export default ControlButtons;