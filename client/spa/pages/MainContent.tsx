import {Component} from 'react';
import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import {IRootState} from 'client/common/store/storeInterface';
import ProfileMenu from 'client/spa/pages/ProfileMenu';
import MyAds from 'client/spa/pages/MyAds';
import ProfileSettings from 'client/spa/pages/ProfileSettings/ProfileSettings';

export interface IState {
	settings: boolean;
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
	state: IState = {
		settings: false,
	};

	onShow = window => {
		window.settings ? this.setState({settings: !this.state.settings}) : null;
	}

	render() {
		return (
			<section className='page'>
				<div className='container page__container-lg'>
					<div className='row'>
						<div className='col-lg-4 col-xl-3'>
							<ProfileMenu show={this.onShow}/>
						</div>
						<div className='col-lg-8 col-xl-9'>
							{this.state.settings ? <ProfileSettings/> : <MyAds/>}
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainContent);