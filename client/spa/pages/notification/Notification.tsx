import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';

import { IRootState } from 'client/common/store/storeInterface';
import { INotification } from 'client/common/notification/interface';
import { INotificationState } from 'client/common/notification/reducer';
import { INotificationActions, NotificationActions } from 'client/common/notification/actions';
import { bindModuleAction } from 'client/common/user/utils';
import { filterNotification } from 'client/spa/pages/notification/utils';

export interface IState {
	selectedFilter: FilterType;
}

export interface IProps {
	notification: INotificationState;
	notificationActions: INotificationActions;
}

const mapStateToProps = (state: IRootState) => ({
	notification: state.notification,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
	notificationActions: bindModuleAction(NotificationActions, dispatch),
});

export enum FilterType {
	Read   = 'Read',
	NoRead = 'No read',
	All    = 'All',
}

class Notification extends Component<IProps, IState> {

	state: IState = {
		selectedFilter: FilterType.All,
	};

	convertToItem = ({ id, data, read_at }: INotification) => {

		return (
			<div
				style={{ background: read_at ? '' : '#ffb91b9c' }}
				key={id}
				className='offer-block__item'
				onClick={this.onClick(id)}
			>
				<div className='offer-block__inner'>
					<div className='row'>
						<div className='col-9 d-flex'>
							<div className='offer-block__info'>
								<div>
									<h5 style={{ margin: 10 }}>{data.message}</h5>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	renderListNotification() {
		const { data } = this.props.notification;

		const notification = filterNotification(this.state.selectedFilter, data);

		if (notification.length === 0) {
			return <h2>Not notification</h2>;
		}
		return notification.map(this.convertToItem);
	}

	onSelectFilter = (selectedFilter: FilterType) => () => {
		this.setState({ selectedFilter });
	}

	onClick = (id: string) => () => {
		this.props.notificationActions.read.REQUEST({ id });
	}

	FilterButton = (props: { buttonFilter: FilterType, notifications: INotification[] }) => {
		const { buttonFilter, notifications } = props;

		const cont     = filterNotification(buttonFilter, notifications).length;
		const isActive = buttonFilter === this.state.selectedFilter;

		return (
			<a
				onClick={this.onSelectFilter(buttonFilter)}
				className={`filter-offer__link ${isActive ? 'link-active' : ''}`}
			>
				{buttonFilter}
				<span className='grey-text'> {cont}</span>
			</a>

		);
	}

	render() {
		const { data } = this.props.notification;
		return (
			<>
				<div className='filter-offer d-flex'>
					<this.FilterButton
						buttonFilter={FilterType.All}
						notifications={data}
					/>
					<this.FilterButton
						buttonFilter={FilterType.NoRead}
						notifications={data}
					/>
					<this.FilterButton
						buttonFilter={FilterType.Read}
						notifications={data}
					/>
				</div>
				{this.renderListNotification()}
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);