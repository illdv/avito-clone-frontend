import * as React from 'react';
import FavoritesItem from 'client/spa/pages/favorites/FavoritesItem';

interface IFavoritesPageProps {
	ads: IAd[];
	removeFavoriteAds: (id) => void;
}

interface IFavoritesPageState {
	selected: Set<string>;
	checkedAll: boolean;
	adsCollection: IAd[];
}

const createAdsCollection = (ads: IAdsObject): IAd[] => {
	return Object.keys(ads).map((key: string) => {
		return ads[key];
	});
};

class FavoritesPage extends React.Component<IFavoritesPageProps, IFavoritesPageState> {
	state = {
		selected: new Set(),
		checkedAll: false,
		adsCollection: [],
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		let adsCollection;

		try {
			adsCollection = createAdsCollection(nextProps.ads);
		} catch (e) {
			console.log('Error adsCollection', adsCollection);
		}
		return {
			adsCollection,
		};
	}

	handleRemove = () => {
		const selected = this.state.selected;
		let array = Array.from(selected);
		this.props.removeFavoriteAds(array);
		selected.clear();
		this.setState({checkedAll: false, selected});
	}

	handleCheckAll = () => {
		let {selected, adsCollection} = this.state;
		if (this.state.checkedAll) {
			selected.clear();
		} else {
			selected = this.getAllId(adsCollection);
		}
		const checkedAll = !this.state.checkedAll;

		this.setState({checkedAll, selected});
	}

	handleCheck = (id: string, checked: boolean) => {
		let selected = this.state.selected;
		if (checked) {
			selected.add(id);
		} else {
			selected.delete(id);
		}
		this.setState({selected});
	}

	private getAllId(adList: IAd[]) {
		const idList = new Set();
		adList.forEach(ad => idList.add(ad.id));
		return idList;
	}

	render() {
		const {checkedAll, selected, adsCollection} = this.state;
		return (
			<>
				<div className='remove-offer'>
					<input
						type='checkbox'
						className='custom-checkbox favorites-page__input'
						onChange={this.handleCheckAll}
						checked={checkedAll}
					/>
					<button
						className='btn grey-btn-outline w-25 remove-offer__button'
						onClick={this.handleRemove}
					>Remove
					</button>
				</div>
				<div className='favourites-offer-block'>
					{adsCollection ?
						adsCollection.map(ad => <FavoritesItem
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
