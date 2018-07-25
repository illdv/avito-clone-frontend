import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IRootState } from 'client/common/store/storeInterface';
import { INotification } from 'client/common/notification/interface';
import { INotificationState } from 'client/common/notification/reducer';
import { INotificationActions, NotificationActions } from 'client/common/notification/actions';
import { bindModuleAction } from 'client/common/user/utils';

export interface IState {

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

class Notification extends Component<IProps, IState> {

	state: IState = {};

	componentDidMount(): void {
		this.props.notificationActions.loading.REQUEST({});
	}

	convertToItem = ({ id, title, isRead }: INotification) => {

		return (
			<div
				style={{ background: isRead && '#ffb91b9c' || '' }}
				key={id}
				className='offer-block__item'
			>
				<div className='offer-block__inner'>
					<div className='row'>
						<div className='col-9 d-flex'>
							<div className='offer-block__info'>
								<div>
									<h5>{title}</h5>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		const { data } = this.props.notification;
		return (
			<div>
				{
					data.map(this.convertToItem)
				}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);