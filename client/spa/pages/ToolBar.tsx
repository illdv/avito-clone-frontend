import {Component} from 'react';
import * as React from 'react';
import {connect, Dispatch} from 'react-redux';

import {IRootState} from 'client/common/store/storeInterface';

export interface IState {

}

export interface IProps {
	onCreateAd: () => void;
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

class ToolBar extends Component<IProps, IState> {

	state: IState = {};

	render() {
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
							<nav className='navbar'>
								<ul className='main-navigation navbar-nav'>
									<li className='main-navigation__item nav-item'>
										<a href='#'>
											<i className='fas fa-comment-alt fa-lg'/>
										</a>
										<span className='notification main-navigation__notification'>3</span>
									</li>
									<li className='main-navigation__item nav-item'>
										<a href='#'>
											<i className='fas fa-thumbs-up fa-lg'/>
										</a>
										<span className='notification main-navigation__notification'>3</span>
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
							<button
								className='btn orange-btn'
								onClick={this.props.onCreateAd}
							>
								Submit an advertisement
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);