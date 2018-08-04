import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';

import { IRootState } from 'client/common/store/storeInterface';
import { AdsActionType } from 'client/common/entities/user/modules/owned-ads/interfaces';
import { UserActions } from 'client/common/entities/user/rootActions';

import Ads, { IAvtiveButtonConfig } from './Ads';
import ControlButtons from 'client/spa/profile/pages/my-ads/Control';

export interface IProps {
	user: IUserState;
}

export interface IMyAdsState {
	ids: number[];
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

class MyAds extends Component<IProps, IMyAdsState> {
	constructor(props) {
		super(props);

		this.state = {
			ids: [],
		};
	};

	onRemove = (id: number) => {
		UserActions.ownedAds.remove.REQUEST({ id });
	}

	onEdit = (id: number) => {
		UserActions.ownedAds.selectForEdit.REQUEST({ id });
	}

	onChangeActive = (id: number) => {
		UserActions.ownedAds.changeStatus.REQUEST({ actionType: AdsActionType.Activate, id });
		UserActions.ownedAds.changeStatus.REQUEST({ actionType: AdsActionType.Approve, id });
	}

	onChangeComplete = (id: number) => {
		UserActions.ownedAds.changeStatus.REQUEST({ actionType: AdsActionType.Complete, id });
		UserActions.ownedAds.changeStatus.REQUEST({ actionType: AdsActionType.Deactivate, id });
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
	disapprovedAdsButtonsConfig: IAvtiveButtonConfig[] = [
		{
			label: 'Active',
			className: 'btn orange-btn-outline publish-offer__button',
			callback: (id: number) => this.onChangeActive(id),
		},
		{
			label: 'Remove',
			className: 'btn grey-btn-outline publish-offer__button',
			callback: (id: number) => this.onRemove(id),
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
	completedAdsButtonsConfig: IAvtiveButtonConfig[] = [
		{
			label: 'Active',
			className: 'btn orange-btn-outline publish-offer__button',
			callback: (id: number) => this.onChangeActive(id),
		},
		{
			label: 'Remove',
			className: 'btn grey-btn-outline publish-offer__button',
			callback: (id: number) => this.onRemove(id),
		},
	];
	
	creatorCompletedAdsComponent = (ads: IAd[]) => () => (
		<Ads
			ads={ads}
			enabledEdit={true}
			activeButtons={this.completedAdsButtonsConfig}
			selected={this.selectAds}
		/>
	)

	// Active
	activeAdsButtonsConfig: IAvtiveButtonConfig[] = [
		{
			label: 'Complete',
			className: 'btn orange-btn-outline publish-offer__button',
			callback: (id: number) => this.onChangeComplete(id),
		},
		{
			label: 'Remove',
			className: 'btn grey-btn-outline publish-offer__button',
			callback: (id: number) => this.onRemove(id),
		},
	];

	creatorActiveAdsComponent = (ads: IAd[]) => () => (
		<Ads
			ads={ads}
			enabledEdit={true}
			activeButtons={this.activeAdsButtonsConfig}
			selected={this.selectAds}
		/>
	);

	selectAds = (id: number[]) => {
		console.log(id);
	};

	render() {
		const sortedAds = this.sortingAdsByStatus();

		return (
			<>
				<div className='filter-offer d-flex'>
					<FilterButton to='/profile/my-ads/disapproved' label='Disapproved' count={sortedAds.disapproved.length} />
					<FilterButton to='/profile/my-ads/active'      label='Active'      count={sortedAds.active.length} />
					<FilterButton to='/profile/my-ads/completed'   label='Completed'   count={sortedAds.completed.length} />
				</div>
				<ControlButtons ads={this.props.user.ownedAds} selected={this.selectAds} options={[]}/>
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