import React, { Component } from 'react';

export interface IProps {
	id: number;
	title: string;
}

class ChangeSelectOption extends Component<IProps> {
	render() {
		return (
			<option
				value={this.props.id}
			>
				{this.props.title}
			</option>
		);
	}
}

export default ChangeSelectOption;