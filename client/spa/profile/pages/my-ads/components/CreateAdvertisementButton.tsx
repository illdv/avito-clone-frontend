import React, { Component } from 'react';
import { createAdPagePagePath } from 'client/spa/profile/constants';
import { Link, withRouter } from 'react-router-dom';

interface IPropsButton {
	className: string;
};

class CreateAdvertisementButton extends Component<IPropsButton> {
	render() {
		return (
			<Link to={createAdPagePagePath}>
				<button
					className={this.props.className}
				>
					Submit an advertisement
				</button>
			</Link>
		);
	}
}

export default CreateAdvertisementButton;