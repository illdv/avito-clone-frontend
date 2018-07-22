import React, { Component } from 'react';
import { AdsAPI } from 'api/AdsAPI';
import { IFavorites, IFavoriteState } from 'client/ssr/blocks/ad/interface';

class ButtonFavorites extends Component <IFavorites, IFavoriteState> {
	constructor(props) {
		super (props);
		this.state = {
			is_favorite: this.props.is_favorite,
		};
	}
	switchFavorite = () => {
		AdsAPI.switchFavorite(this.props.id)
			.then((response) => {
				this.setState(() => {
					return {is_favorite: !this.props.is_favorite};
				});
			});
	}


	render() {
		return (
			<React.Fragment>
				<button
					className='btn orange-btn-outline m-t-10 d-block no-b-r'
					onClick={this.switchFavorite}
				>Add to favourites
				</button>
			</React.Fragment>
		)
	}

}

export default ButtonFavorites;