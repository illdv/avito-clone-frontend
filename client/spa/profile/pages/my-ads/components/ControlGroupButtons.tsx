import React, { Component } from 'react';
import { IControlButtonsProps, IControlButtonsState } from 'client/spa/profile/interfaces/controlButtons';
import ActiveButton from 'client/spa/profile/pages/my-ads/components/ActiveButton';

class ControlGroupButtons extends Component <IControlButtonsProps, IControlButtonsState> {
	constructor(props) {
		super(props);

		this.state = {
			ids: this.initialIds,
			options: this.initialOptions,
		};
	}
	selectAllAds = () => {
		this.props.changeAll(this.state.ids);
	}

	get initialIds() {
		return this.props.ads.map(ad => {
			return Number(ad.id);
		});
	}

	get initialOptions() {
		return this.props.options.map(option => {
			return option;
		});
	}

	render() {
		return (
			<div className='remove-offer'>
				<input
					type='checkbox'
					className='custom-checkbox'
					onChange={this.selectAllAds}
					checked={this.props.selectedAll}
				/>
				{
					this.state.options.map(option => {
						return <ActiveButton
							key={option.label}
							option={option}
							id={this.props.selectedIds}
						/>;
					})
				}
			</div>
		);
	}
}

export default ControlGroupButtons;