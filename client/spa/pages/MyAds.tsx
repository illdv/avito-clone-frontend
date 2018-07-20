import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IRootState } from 'client/common/store/storeInterface';
import { bindModuleAction } from 'client/common/user/utils';
import { AdsActions, IAdsActions } from 'client/common/ads/actions';
import { IAdsState } from 'client/common/ads/reducer';
import { IAds } from 'client/common/ads/interface';

export interface IState {

}

export interface IProps {
	ads: IAdsState;
	adsActions: IAdsActions;
}

const mapStateToProps = (state: IRootState) => ({
	ads: state.ads,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
	adsActions: bindModuleAction(AdsActions, dispatch),
});

const Item = (props: { ad: IAds, onRemove: () => void }) => {
	const { ad, onRemove } = props;
	const { title, id }    = ad;

	return (
		<div
			key={id}
			className='offer-block__item'
		>
			<input type='checkbox' />
			<div className='offer-block__inner'>
				<div className='row no-gutters'>
					<div className='col-md-3 col-lg-3'>
						<img
							src='/static/img/ads/ads3.png'
							alt=''
							className='offer-block__img'
						/>
					</div>
					<div className='col-md-6 col-lg-6'>
						<a
							href='#'
							className='f-s-16'
						>
							<h5>
								{title}
							</h5>
						</a>
						<span className='d-inline-block offer-block__price'>790 000 $</span>
						<div className='publish-offer'>
							<a
								className='btn button button_dark-outline publish-offer__button'
							>
								Activate
							</a>
							<a
								onClick={onRemove}
								className='btn button button_dark-outline publish-offer__button'
							>
								Remove
							</a>
						</div>
					</div>
					<div className='col-md-3 col-lg-3 text-right edit-block'>
						<a
							href='#'
							className='edit-block__link'
						>
							Edit
						</a>
						<div className='watcher'>
							<i className='watcher__icon fa fa-eye' /> <span>5647</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

class MyAds extends Component<IProps, IState> {

	state: IState = {};
	onRemove      = (id: string) => () => {
		this.props.adsActions.remove.REQUEST({ id });
	}

	componentDidMount(): void {
		this.props.adsActions.getMy.REQUEST({});
	}

	render() {
		const { isLoading, ads } = this.props.ads;

		if (isLoading) {
			return <h1>Loading...</h1>;
		}

		return (
			<>
				<div className='filter-offer d-flex'>
					<div className='filter-offer__item'>
						<a
							href=''
							className='filter-offer__link'
						>
							Disapproved
						</a>
						<span className='text_count-category'>1</span>
					</div>
					<div className='filter-offer__item'>
						<a
							href=''
							className='filter-offer__link'
						>
							Active
						</a>
						<span className='text_count-category'>1</span>
					</div>
					<div className='filter-offer__item'>
						<a
							href=''
							className='filter-offer__link link-active'
						>
							Completed
						</a>
						<span className='text_count-category'>1</span>
					</div>
				</div>
				<div className='remove-offer'>
					<input type='checkbox' />
					<button className='btn button button_dark-outline remove-offer__button w-25'>
						Active
					</button>
					<button className='btn button button_dark-outline w-25 remove-offer__button'>
						Remove
					</button>
				</div>
				<div className='offer-block'>
					{ads.map(ad => (
						<Item
							key={ad.id}
							ad={ad}
							onRemove={this.onRemove(ad.id)}
						/>
					))}
				</div>
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAds);