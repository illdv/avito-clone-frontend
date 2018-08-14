import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { NavLink, Route, Switch } from 'react-router-dom';

import Page404 from 'client/common/layouts/Page404';
import { IRootState } from 'client/common/store/storeInterface';
import { AdsActionType } from 'client/common/entities/user/modules/owned-ads/interfaces';
import { UserActions } from 'client/common/entities/user/rootActions';

import Ads from './Ads';
import { IActiveButtonConfig } from 'client/spa/profile/interfaces/controlButtons';
import Footer from 'client/ssr/blocks/footer/Footer';
import { Redirect } from 'react-router';
import { myDisapprovedAdsPagePath, myCompletedAdsPagePath, myActiveAdsPagePath } from '../../constants';

export interface IProps {
	user: IUserState;
}

const mapStateToProps = (state: IRootState) => ({
	user: state.user,
});

const FilterButton: React.SFC<{ to: string, label: string, count: number }> = ({ to, label, count }) => (
	<NavLink
		to={ to }
		className='filter-offer__link'
		activeClassName='link-active'
	>
		{ label }
		<span className='grey-text'> { count }</span>
	</NavLink>
);

class MyAds extends Component<IProps> {
	onRemove = (id: Set<number>) => {
		const ids = Array.from(id.values());
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
			noContent={''}
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
			noContent={'While you do not have completed announcements'}
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
			noContent={'While you do not have announcements'}
			submitAd={true}
		/>
	);

	render() {
		const sortedAds = this.sortingAdsByStatus();

		return (
			<>
				<div className='filter-offer d-flex'>
					<FilterButton to={ myDisapprovedAdsPagePath } label='Disapproved' count={sortedAds.disapproved.length} />
					<FilterButton to={ myActiveAdsPagePath }      label='Active'      count={sortedAds.active.length} />
					<FilterButton to={ myCompletedAdsPagePath }   label='Completed'   count={sortedAds.completed.length} />
				</div>
				<Switch>
					<Route path={ myDisapprovedAdsPagePath } component={this.creatorDisapprovedAdsComponent(sortedAds.disapproved)} />
					<Route path={ myCompletedAdsPagePath } component={this.creatorCompletedAdsComponent(sortedAds.completed)} />
					<Route path={ myActiveAdsPagePath } component={this.creatorActiveAdsComponent(sortedAds.active)} />
					<Redirect exact to={ myActiveAdsPagePath } />
				</Switch>
			</>
		);
	}
}

export default connect(mapStateToProps)(MyAds);
