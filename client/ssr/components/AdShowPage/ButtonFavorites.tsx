import React, { Component } from 'react';
import { IFavorites } from 'client/ssr/blocks/ad/interface';

class ButtonFavorites extends Component <IFavorites> {
	handleSelectFavorite = () => {
		this.props.selectFavorite(this.props.id);
	}

	render() {
		const { isFavorite } = this.props;
		return (
			<React.Fragment>
				<button
					className='btn orange-btn-outline m-t-10 d-block no-b-r my-md-3'
					onClick={this.handleSelectFavorite}
				>{ isFavorite ? 'Remove from favourites' : 'Add to favourites' }
				</button>
			</React.Fragment>
		);
	}
}

export default ButtonFavorites;

