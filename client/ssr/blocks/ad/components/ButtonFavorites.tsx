import React, { Component } from 'react';
import { IFavorites, IFavoriteState } from 'client/ssr/blocks/ad/interface';

export class ButtonFavorites extends Component <IFavorites, IFavoriteState> {
	constructor(props) {
		super(props);
	}

	handleSelectFavorite = () => {
		this.props.selectFavorite(this.props.id)
	};


	render() {
		return (
			<React.Fragment>
				<button
					className='btn orange-btn-outline m-t-10 d-block no-b-r my-md-3'
					onClick={this.handleSelectFavorite}
				>{this.props.isFavorite ? 'Remove from favourites': 'Add to favourites' }
				</button>
			</React.Fragment>
		);
	}

}



