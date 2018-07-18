import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { IRootState } from 'client/common/store/storeInterface';

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

export class ToolBar extends Component<IProps, IState> {

	state: IState = {};

	render() {
		return (
			<div className='header__bottom-header'>
				<div className='container'>
					<div className='row justify-content-between no-gutters'>
						<div className=' col-md-4 col-lg-2'>
							<div className='navbar-expand-lg navbar main-nav'>
								<a
									href=''
									className='navbar-brand logo'
								>
									<img
										src='/static/img/logo.svg'
										alt=''
									/>
								</a>
							</div>
						</div>
						<div className='col-md-8 col-lg-8 d-flex justify-content-end'>
							<nav className='navbar-expand-lg navbar'>
								<ul className='main-navigation navbar-nav'>
									<li className='main-navigation__item nav-item'>
										<a href='#'>
											<i className='fas fa-comment-alt fa-lg'/>
										</a>
										<span className='badge main-navigation__badge-notify'>3</span>
									</li>
									<li className='main-navigation__item nav-item '>
										<a href='#'>
											<i className='fas fa-thumbs-up fa-lg'/>
										</a>
										<span className='badge main-navigation__badge-notify'>3</span>
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
							</nav>
							<a className='btn button bottom-header__button button_bright '>Submit an advertisement</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);