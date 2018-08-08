import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';

import { IRootState } from 'client/common/store/storeInterface';
import { AdsActionType } from 'client/common/entities/user/modules/owned-ads/interfaces';
import { UserActions } from 'client/common/entities/user/rootActions';

import Ads from './Ads';
import { IActiveButtonConfig } from 'client/spa/profile/interfaces/controlButtons';

export interface IProps {
	user: IUserState;
}

const mapStateToProps = (state: IRootState) => ({
	user: state.user,
});

const FilterButton: React.SFC<{to: string, label: string, count: number}> = ({to, label, count}) => (
	<NavLink
		to={ to }
		className='filter-offer__link'
		activeClassName='link-active'
	>
		{label}
		<span className='grey-text'> {count}</span>
	</NavLink>
);

class MyAds extends Component<IProps> {
	onRemove = (id: Set<number>) => {
		const ids = Array.from(id.values());
		console.log(ids);
		UserActions.ownedAds.remove.REQUEST({ ids });
	}

	onEdit = (id: number) => {
		UserActions.ownedAds.selectForEdit.REQUEST({ id });
	}

	onChangeActive = (id: Set<number>) => {
		const ids = Array.from(id.values());
		UserActions.ownedAds.changeStatus.REQUEST({ actionType: AdsActionType.Activate, ids });
		UserActions.ownedAds.changeStatus.REQUEST({ actionType: AdsActionType.Approve, ids });
	}

	onChangeComplete = (id: Set<number>) => {
		const ids = Array.from(id.values());
		UserActions.ownedAds.changeStatus.REQUEST({ actionType: AdsActionType.Complete, ids });
		UserActions.ownedAds.changeStatus.REQUEST({ actionType: AdsActionType.Deactivate, ids });
	}

	componentDidMount(): void {
		UserActions.ownedAds.getMy.REQUEST({});
	}

	sortingAdsByStatus = () => {
		const disapproved: IAd[] = [];
		const active: IAd[]      = [];
		const completed: IAd[]   = [];

		this.props.user.ownedAds.items.forEach(item => {
			if (item.is_active) {
				active.push(item);
			} else if (item.is_completed) {
				completed.push(item);
			} else {
				disapproved.push(item);
			}
		});

		return {
			disapproved,
			active,
			completed,
		};
	}

	// Disapproved
	disapprovedAdsButtonsConfig: IActiveButtonConfig[] = [
		{
			label: 'Active',
			className: 'btn orange-btn-outline publish-offer__button',
			callback: (ids: Set<number>) => this.onChangeActive(ids),
		},
		{
			label: 'Remove',
			className: 'btn grey-btn-outline publish-offer__button',
			callback: (ids: Set<number>) => this.onRemove(ids),
		},
	];

	creatorDisapprovedAdsComponent = (ads: IAd[]) => () => (
		<Ads
			ads={ads}
			enabledEdit={true}
			activeButtons={this.disapprovedAdsButtonsConfig}
		/>
	)

	// Completed
	completedAdsButtonsConfig: IActiveButtonConfig[] = [
		{
			label: 'Active',
			className: 'btn orange-btn-outline publish-offer__button',
			callback: (ids: Set<number>) => this.onChangeActive(ids),
		},
		{
			label: 'Remove',
			className: 'btn grey-btn-outline publish-offer__button',
			callback: (ids: Set<number>) => this.onRemove(ids),
		},
	];
	
	creatorCompletedAdsComponent = (ads: IAd[]) => () => (
		<Ads
			ads={ads}
			enabledEdit={true}
			activeButtons={this.completedAdsButtonsConfig}
		/>
	)

	// Active
	activeAdsButtonsConfig: IActiveButtonConfig[] = [
		{
			label: 'Complete',
			className: 'btn orange-btn-outline publish-offer__button',
			callback: (ids: Set<number>) => this.onChangeComplete(ids),
		},
		{
			label: 'Remove',
			className: 'btn grey-btn-outline publish-offer__button',
			callback: (ids: Set<number>) => this.onRemove(ids),
		},
	];

	creatorActiveAdsComponent = (ads: IAd[]) => () => (
		<Ads
			ads={ads}
			enabledEdit={true}
			activeButtons={this.activeAdsButtonsConfig}
		/>
	);

	render() {
		const sortedAds = this.sortingAdsByStatus();

		return (
			<>
				<div className='filter-offer d-flex'>
					<FilterButton to='/profile/my-ads/disapproved' label='Disapproved' count={sortedAds.disapproved.length} />
					<FilterButton to='/profile/my-ads/active'      label='Active'      count={sortedAds.active.length} />
					<FilterButton to='/profile/my-ads/completed'   label='Completed'   count={sortedAds.completed.length} />
				</div>
				<Switch>
					<Route path='/profile/my-ads/disapproved' component={this.creatorDisapprovedAdsComponent(sortedAds.disapproved)} />
					<Route path='/profile/my-ads/completed' component={this.creatorCompletedAdsComponent(sortedAds.completed)} />
					<Route path='/profile/my-ads/active' component={this.creatorActiveAdsComponent(sortedAds.active)} />
				</Switch>
			</>
		);
	}
}

export default connect(mapStateToProps)(MyAds);