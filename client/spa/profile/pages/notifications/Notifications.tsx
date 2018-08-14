import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';

import {IRootState} from 'client/common/store/storeInterface';
import {UserActions} from 'client/common/entities/user/rootActions';
import {filterNotification} from './utils';
import {FilterType} from './interface';

const FilterButton = (props: { buttonFilter: FilterType, length: number, isActive: boolean, onClick: () => void }) => {
	const {buttonFilter, length, isActive, onClick} = props;

	return (
		<a
			onClick={onClick}
			className={`filter-offer__link ${isActive ? 'link-active' : ''}`}
		>
			{buttonFilter}
			<span className='grey-text'> {length}</span>
		</a>

	);
};

export interface IState {
	selectedFilter: FilterType;
	all: INotification[];
	noRead: INotification[];
	read: INotification[];
	selectedIds: string[];
	selectedAll: boolean;
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
		all: [],
		noRead: [],
		read: [],
		selectedIds: [],
		selectedAll: false,
	};

	static getDerivedStateFromProps(nextProps: IProps, prevState: IState): IState {
		const {items} = nextProps.user.notifications;
		if (items !== prevState.all) {
			return {
				selectedFilter: FilterType.All,
				all: items,
				noRead: filterNotification(FilterType.NoRead, items),
				read: filterNotification(FilterType.Read, items),
				selectedIds: [],
				selectedAll: false,
			};
		}
		return null;
	}

	componentDidMount() {
		UserActions.notifications.loading.REQUEST({});
	}

	onSelectFilter = (selectedFilter: FilterType) => () => {
		this.setState({
			selectedFilter: selectedFilter,
		});
	}

	getSelectedNotification = () => {
		const {all, read, noRead, selectedFilter} = this.state;

		switch (selectedFilter) {
			case FilterType.All:
				return all;
			case FilterType.NoRead:
				return noRead;
			case FilterType.Read:
				return read;
		}
	}

	onSelectAll = () => {
		if (this.state.selectedAll) {
			this.setState({
				selectedIds: [],
				selectedAll: false,
			});
		} else {
			let allNoRead = [];
			this.state.noRead.map(item => {
				allNoRead = [...allNoRead, item.id];
			});

			this.setState({
				selectedIds: allNoRead,
				selectedAll: true,
			});
		}
	}

	selectedCurrent = (e) => {
		const selectedId = e.target.value;
		if (e.target.checked) {
			this.onSelect(selectedId);
		} else {
			this.onUnSelect(selectedId);
		}
	}

	onSelect = (id: string) => {
		this.setState({
			selectedIds:
				{
					...this.state.selectedIds,
					id,
				},
		});
		if (this.state.selectedIds.length === this.state.noRead.length) {
			this.setState({
				selectedAll: true,
			});
		}
	}

	onUnSelect = (selectedId: string) => {
		this.setState({
			selectedIds: this.state.selectedIds.filter(id => id !== selectedId),
		});
	}

	removeChecked = () => {
		UserActions.notifications.read.REQUEST({...this.state.selectedIds});
	}

	onClick = (ids: string[]) => () => {
		UserActions.notifications.read.REQUEST({ids});
	}

	convertToItem = ({id, data, read_at, updated_at}: INotification) => {

		const {selectedIds} = this.state;

		return (
			<div
				className='message-block'
				key={id}
			>
				<div className='message-block__item'>
					{
						!read_at &&
						<input
							type='checkbox'
							className='custom-checkbox'
							value={id}
							onChange={this.selectedCurrent}
							checked={selectedIds.some(item => item === id)}
						/>
					}
					<div className='message-block__inner'>
						<div className='row no-gutters'>
							<div className='col-md-3 col-lg-3'>
								<img src='../images/Rectangle.png' alt='' className='message-block__img'/>
							</div>
							<div className='col-md-6 col-lg-6'>
								<a href='#'>
									<h5>
										Alex Smith
									</h5>
								</a>
								<span className='d-inline-block message-block__offer-name'>
									Monthly discounts
								</span>
								<span className='message-block__message'>{data.message}</span>
							</div>
							<div className='col-md-2 col-lg-2 text-right message-info'>
								{!read_at ?
									<i className='message-info__icon fa fa-check'/>
									:
									<i className='message-info__icon fa fa-check-double'/>
								}
								<span className='message-info__date'>{updated_at}</span>
							</div>
							<div className='col-md-1 col-lg-1 text-right message-info'>
								{
									!read_at &&
									<button
										onClick={this.onClick([id])}
										type='button'
										className='close'
										data-dismiss='alert'
										aria-label='Close'
									>
										<span aria-hidden='true'>&times;</span>
									</button>
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	renderCheckBox = () => {
		if (this.state.selectedFilter === FilterType.Read) {
			return null;
		}
		return (
			<div className='remove-offer'>
				<input
					type='checkbox'
					className='custom-checkbox'
					onChange={this.onSelectAll}
					checked={this.state.selectedAll}
				/>
				<button
					className='btn button grey-btn-outline w-20 publish-offer__button'
					onClick={this.removeChecked}
				>
					Readed
				</button>
			</div>
		);
	}

	renderListNotification() {
		const selectedNotification = this.getSelectedNotification();

		if (selectedNotification.length === 0) {
			return (
				<div
					className='alert alert-light'
					role='alert'
				>
					You don't have any new notifications!
				</div>
			);
		}

		return (
			<>
				{this.renderCheckBox()}
				{selectedNotification.map(this.convertToItem)}
			</>
		);
	}

	render() {
		const {all, read, noRead, selectedFilter} = this.state;

		return (
			<>
				<div className='filter-offer d-flex'>
					<FilterButton
						buttonFilter={FilterType.All}
						length={all.length}
						isActive={selectedFilter === FilterType.All}
						onClick={this.onSelectFilter(FilterType.All)}
					/>
					<FilterButton
						buttonFilter={FilterType.NoRead}
						length={noRead.length}
						isActive={selectedFilter === FilterType.NoRead}
						onClick={this.onSelectFilter(FilterType.NoRead)}
					/>
					<FilterButton
						buttonFilter={FilterType.Read}
						length={read.length}
						isActive={selectedFilter === FilterType.Read}
						onClick={this.onSelectFilter(FilterType.Read)}
					/>
				</div>
				{this.renderListNotification()}
			</>
		);
	}
}

export default connect(mapStateToProps)(Notification);