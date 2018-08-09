import React from 'react';
import {connect, Dispatch} from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import * as history from 'client/common/history';

import {IRootState} from 'client/common/store/storeInterface';

import { createAdPagePagePath, editAdPagePathCreator, defaultPagePath } from '../../constants';
import CreateAdvertisementButton from 'client/spa/profile/pages/my-ads/components/CreateAdvertisementButton';

const goBack = () => window.history.back();

interface IMatchProps {
	id: number;
}

interface IProps extends RouteComponentProps<IMatchProps> {}

interface IState {

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
const GoBackButton = () => (
	<Link to={defaultPagePath}>
		<button
			className='btn grey-btn-outline publish-offer__button'
		>
			Go back
		</button>
	</Link>
);

class ToolBar extends React.Component<IProps, IState> {

	state: IState = {};

	render() {
		let showGoBackButton = false;
		const page = this.props.location;

		if (page.pathname === createAdPagePagePath || page.pathname === editAdPagePathCreator(this.props.match.params.id)) {
			showGoBackButton = true;
		}

		return (
			<div className='header__bottom-header'>
				<div className='container'>
					<div className='row justify-content-between'>
						<div className=' col-md-4 col-lg-2'>
							<a href='/' className='navbar-brand logo'>
								<img src='/static/img/logo.svg'/>
							</a>
						</div>
						<div className='col-md-8 col-lg-8 d-flex justify-content-end align-items-center'>
							{/* <nav className='navbar'>
								<ul className='main-navigation navbar-nav'>
									<li className='main-navigation__item nav-item'>
										<a href='#'>
											<i className='fas fa-comment-alt fa-lg'/>
										</a>
									</li>
									<li className='main-navigation__item nav-item'>
										<a href='#'>
											<i className='fas fa-thumbs-up fa-lg'/>
										</a>
									</li>
									<li className='main-navigation__item nav-item'>
										<a href='#'>
											<i className='fas fa-bell fa-lg'/>
										</a>
									</li>
									<li className='main-navigation__item nav-item'>
										<a href='#'>
											<i className='fas fa-wallet fa-lg'/>
										</a>
									</li>
								</ul>
							</nav> */}
							{
								showGoBackButton
								?
									<GoBackButton />
								:
									<CreateAdvertisementButton className={'btn orange-btn'} />
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolBar));