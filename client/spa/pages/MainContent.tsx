import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IRootState } from 'client/common/store/storeInterface';
import ProfileMenu from 'client/spa/pages/ProfileMenu';
import MyAds from 'client/spa/pages/MyAds';

export interface IState {

}

export interface IProps {

}

const mapStateToProps = (state: IRootState) => ({
	/// nameStore: state.nameStore
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
	/*
	  onLoadingMail: () => {
	   dispatch(Mail.Actions.onLoadingMail.REQUEST());
	 },
	*/
});

export class MainContent extends Component<IProps, IState> {

	state: IState = {};

	render() {
		return (
			<section className='page'>
				<div className='container page__container-lg'>
					<div className='row'>
						<div className='col-lg-3'>
							<ProfileMenu />
						</div>
						<div className='col-lg-9'>
							<MyAds />
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);