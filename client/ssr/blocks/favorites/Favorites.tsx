import * as React from 'react';
import FavoriteItem from './components/FavoriteItem';

require('./Favorites.sass');

interface IFavoritesPageProps {
	ads: IFavoritesItems;
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

	static getDerivedStateFromProps(nextProps) {
		return {
			adsCollection: createAdsCollection(nextProps.ads),
		};
	}

	handleRemove = () => {
		const selected = this.state.selected;
		const array: number[] = Array.from(selected);
		this.props.removeFavoriteAds(array);
		selected.clear();
		this.setState({checkedAll: false, selected});
	}

	handleCheckAll = () => {
		const {adsCollection} = this.state;
		let {selected} = this.state;
		if (this.state.checkedAll) {
			selected.clear();
		} else {
			selected = this.fromAdsCollectionToSet(adsCollection);
		}
		const checkedAll = !this.state.checkedAll;

		this.setState({checkedAll, selected});
	}

	handleCheck = (id: string, checked: boolean) => {
		const {selected, checkedAll} = this.state;
		let currentCheckedAll;
		if (checked) {
			selected.add(id);
		} else {
			selected.delete(id);
		}
		if (checkedAll) {
			currentCheckedAll = !checkedAll;
		}
		this.setState({checkedAll: currentCheckedAll, selected});
	}

	private fromAdsCollectionToSet(adList: IAd[]) {
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
					>
						Remove
					</button>
				</div>
				<div className='favourites-offer-block'>
					{
						adsCollection &&
						adsCollection.map(ad => (
							<FavoriteItem
								key={ad.id}
								item={ad}
								onCheck={this.handleCheck}
								checked={checkedAll || selected.has(ad.id)}
							/>
						))
					}
				</div>
			</>
		);
	}
}

export default FavoritesPage;
