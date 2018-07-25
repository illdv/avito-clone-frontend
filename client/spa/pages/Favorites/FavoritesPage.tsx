import * as React from 'react';
import { IAds } from 'client/common/ads/interface';
import FavoritesItem from 'client/spa/pages/Favorites/FavoritesItem';

interface IFavoritesPageProps {
	ads: IAds[]
	removeFavoriteAds: (id) => void;
}

interface IFavoritesPageState {
	selected: Set<string>;
	checkedAll: boolean;
}

class FavoritesPage extends React.Component<IFavoritesPageProps, IFavoritesPageState> {
	state = {
		selected: new Set(),
		checkedAll: false,
	};

	handleRemove = () => {
		const selected = this.state.selected;
		let array = Array.from(selected);
		this.props.removeFavoriteAds(array);
		selected.clear();
		this.setState({ checkedAll: false, selected });
	};

	handleCheckAll = () => {
		let selected = this.state.selected;
		if (this.state.checkedAll) {
			selected.clear();
		} else {
			selected = this.getAllId(this.props.ads);
		}
		const checkedAll = !this.state.checkedAll;

		this.setState({ checkedAll, selected });
	};

	handleCheck = (id: string, checked: boolean) => {
		let selected = this.state.selected;
		if (checked) {
			selected.add(id);
		} else {
			selected.delete(id);
		}
		this.setState({ selected });
	};

	private getAllId(adList: IAds[]) {
		const idList = new Set();
		adList.forEach(ad => idList.add(ad.id));
		return idList;
	}

	render() {
		const { ads }                  = this.props;
		const { checkedAll, selected } = this.state;
		return (
			<>
				<div className="remove-offer">
					<input
						type="checkbox"
						className="favorites-page__input"
						onChange={this.handleCheckAll}
						checked={checkedAll}
					/>
					<button
						className="btn button button_dark-outline w-25 remove-offer__button"
						onClick={this.handleRemove}
					>Remove
					</button>
				</div>
				<div className="favourites-offer-block">
					{ads ?
						ads.map(ad => <FavoritesItem
							key={ad.id}
							item={ad}
							onCheck={this.handleCheck}
							checked={checkedAll || selected.has(ad.id)}
						/>) :
						<div>You don't have any favorites Ads </div>}
				</div>
			</>
		);
	}
}

export default FavoritesPage;
