import React, { Component } from 'react';

import { IFavorites, IFavoriteState } from 'client/ssr/blocks/ad/interface';
import { CustomStorage } from 'client/common/user/CustomStorage';

class ButtonFavorites extends Component <IFavorites, IFavoriteState> {
	constructor(props) {
		super(props);
	}

	switchFavorite = () => {
		const oldData = JSON.parse(CustomStorage.getItem('favorites_ids'));
		if (!oldData) {
			CustomStorage.setItem('favorites_ids', JSON.stringify([this.props.id]));
			return;
		}
		let newData      = [];
		const isFavorite = oldData.indexOf(this.props.id);
		if (isFavorite !== -1) {
			oldData.splice(isFavorite, 1);
			newData = oldData;
		} else {
			newData = oldData.concat(this.props.id);
		}
		CustomStorage.setItem('favorites_ids', JSON.stringify(newData));
		return;
	}

	// formText = () => {
	// 	return this.state.is_favorite ? 'Remove from favorites' : 'Add to favourites';
	// };

	render() {
		return (
			<React.Fragment>
				<button
					className='btn orange-btn-outline m-t-10 d-block'
					onClick={this.switchFavorite}
				>Add to favourites
				</button>
			</React.Fragment>
		);
	}

}

export default ButtonFavorites;