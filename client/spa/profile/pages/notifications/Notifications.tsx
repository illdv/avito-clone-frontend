import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

import { IRootState } from 'client/common/store/storeInterface';
import { UserActions } from 'client/common/entities/user/rootActions';
import { filterNotification } from './utils';
import { FilterType } from './interface';

export interface IState {
	selectedFilter: FilterType;
}

export interface IProps {
	user: IUserState;
}

const mapStateToProps = (state: IRootState) => ({
	user: state.user,
});

class Notification extends Component<IProps, IState> {

	state: IState = {
		selectedFilter: FilterType.All,
	};

	convertToItem = ({ id, data, read_at }: INotification) => {

		return (
			<div
				style={{ background: read_at ? '' : '#ffb91b9c' }}
				key={id}
				className={'alert alert-dismissible ' + (read_at ? 'alert-light' : 'alert-warning')}
				role='alert'
			>
				{data.message}
				{
					!read_at &&
					<button
						onClick={this.onClick(id)}
						type='button'
						className='close'
						data-dismiss='alert'
						aria-label='Close'
					>
						<span aria-hidden='true'>&times;</span>
					</button>
				}
			</div>

		);
	}

	renderListNotification() {
		const { items } = this.props.user.notifications;

		const notification = filterNotification(this.state.selectedFilter, items);

		if (notification.length === 0) {
			return (
				<div
					className='alert alert-light'
					role='alert'
				>
					You don't have any new notifications!
				</div>
			);
		}
		return notification.map(this.convertToItem);
	}

	onSelectFilter = (selectedFilter: FilterType) => () => {
		this.setState({ selectedFilter });
	}

	onClick = (id: string) => () => {
		UserActions.notifications.read.REQUEST({ id });
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

	componentDidMount() {
		UserActions.notifications.loading.REQUEST({});
	}

	render() {
		const { items } = this.props.user.notifications;
		return (
			<>
				<div className='filter-offer d-flex'>
					<this.FilterButton
						buttonFilter={FilterType.All}
						notifications={items}
					/>
					<this.FilterButton
						buttonFilter={FilterType.NoRead}
						notifications={items}
					/>
					<this.FilterButton
						buttonFilter={FilterType.Read}
						notifications={items}
					/>
				</div>
				{this.renderListNotification()}
			</>
		);
	}
}

export default connect(mapStateToProps)(Notification);