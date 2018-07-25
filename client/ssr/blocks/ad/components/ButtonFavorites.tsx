import React, { Component } from 'react';
import { IFavorites, IFavoriteState } from 'client/ssr/blocks/ad/interface';

class ButtonFavorites extends Component <IFavorites, IFavoriteState> {
	constructor(props) {
		super(props);
	}

	handleSelectFavorite = () => {
		this.props.selectFavorite(this.props.id)
	};
	// formText = () => {
	// 	return this.state.is_favorite ? 'Remove from favorites' : 'Add to favourites';
	// };

	render() {
		return (
			<React.Fragment>
				<button
					className='btn orange-btn-outline m-t-10 d-block no-b-r'
					onClick={this.handleSelectFavorite}
				>Add to favourites
				</button>
			</React.Fragment>
		);
	}

}

export default ButtonFavorites;