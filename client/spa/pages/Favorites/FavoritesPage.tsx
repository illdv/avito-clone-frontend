import * as React from 'react';
import { IAds } from 'client/common/ads/interface';
import FavoritesItem from 'client/spa/pages/Favorites/FavoritesItem';

interface IFavoritesPageProps {
	ads: IAds[]
	removeFavoriteAds: (id) => void;
}

interface IFavoritesPageState {
	selected: any[];
	checkedAll: boolean;
	adsCollection: IAds[];
}

class FavoritesPage extends React.Component<IFavoritesPageProps, IFavoritesPageState> {
	state = {
		selected: [],
		checkedAll: false,
		adsCollection: []
	};
	static getDerivedStateFromProps(nextProps, prevState){
		let adsCollection;
		function createAdsCollection(ads) {
			const adsCollection = [];
			Object.keys(ads).map((ad) => {
				const item = ads[ad];
				adsCollection.push(item);
			});
			return adsCollection;
		}

		try {
			adsCollection = createAdsCollection(nextProps.ads);
		} catch (e) {
			console.log('Error adsCollection', adsCollection);
		}
		return {
			adsCollection
		}
	}
	handleRemove = () => {
		const selected = this.state.selected;
		this.props.removeFavoriteAds(selected);
		this.setState({ checkedAll: false, selected: [] });
	};

	handleCheckAll = () => {
		let {selected, adsCollection} = this.state;
		if (this.state.checkedAll) {
			selected = [];
		} else {
			selected = this.getAllId(adsCollection);
		}
		const checkedAll = !this.state.checkedAll;

		this.setState({ checkedAll, selected });
	};

	handleCheck = (id: any, checked: boolean) => {
		let selected = this.state.selected;
		if (checked) {
			selected.push(id);
		} else {
			if (selected) {
				const index = selected.indexOf(id);
				selected    = {
					...selected.slice(0, Number(index)),
					...selected.slice(Number(index) + 1)
				};
			}

		}
		this.setState({ selected });
	};

	private getAllId(adList: IAds[]) {
		const idList = [];
		adList.forEach(ad => idList.push(ad.id));
		return idList;
	}

	isCheck = (id) => {
		const { checkedAll, selected } = this.state;
		console.log('selected1', selected);
		return function () {
			console.log('selected', selected);
			return checkedAll || selected.indexOf(id)

		}
	}

	render() {
		const { checkedAll, selected, adsCollection} = this.state;

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
					{adsCollection ?
						adsCollection.map(ad => <FavoritesItem
							key={ad.id}
							item={ad}
							onCheck={this.handleCheck}
							checked={checkedAll || selected.indexOf(ad.id)}
						/>) :
						<div>You don't have any favorites Ads </div>}
				</div>
			</>
		);
	}
}

export default FavoritesPage;
