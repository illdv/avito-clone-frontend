import React, { Component } from 'react';
import { IActiveButtonConfig, IActiveButtonProps } from 'client/spa/profile/interfaces/controlButtons';

class ActiveButton extends Component<IActiveButtonProps> {

	currentButton = (id: Set<number>, option: IActiveButtonConfig) => {
		const intCall = () => option.callback(id);
		return (
			<a
				onClick={intCall}
				className={option.className}
			>
				{option.label}
			</a>
		);
	};

	render() {
		return (
			<>
				{this.currentButton(this.props.id, this.props.option)}
			</>
		);
	}
}

export default ActiveButton;