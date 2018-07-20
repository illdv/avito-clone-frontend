import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IRootState } from 'client/common/store/storeInterface';
import { bindModuleAction } from 'client/common/user/utils';
import { AdsActions, IAdsActions } from 'client/common/ads/actions';
import { IAdsState } from 'client/common/ads/reducer';
import { IAds } from 'client/common/ads/interface';
import { filterMyAds, MyAdsStatus } from 'client/spa/pages/utils';

export interface IState {
	selectedFilter: MyAdsStatus;
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

class MyAds extends Component<IProps, IState> {

	state: IState = {
		selectedFilter: MyAdsStatus.Active,
	};

	onSelectFilter = (selectedFilter: MyAdsStatus) => () => {
		this.setState({ selectedFilter });
	}

	onRemove = (id: string) => () => {
		this.props.adsActions.remove.REQUEST({ id });
	}

	onChangeStatus = (status: MyAdsStatus, id: string) => () => {
		this.props.adsActions.changeStatus.REQUEST({ status, id });
	}

	onChangeActive = (id: string) => () => {
		this.props.adsActions.changeStatus.REQUEST({ status: MyAdsStatus.Active, id });
		this.props.adsActions.changeStatus.REQUEST({ status: MyAdsStatus.Disapproved, id });
	}

	ActiveButton = ({ id }: { id: string }) => {
		const { selectedFilter } = this.state;
		if (selectedFilter === MyAdsStatus.Disapproved) {
			return (
				<a
					className='btn button button_dark-outline publish-offer__button'
					onClick={this.onChangeActive(id)}
				>
					Activate
				</a>
			);
		}

		if (selectedFilter === MyAdsStatus.Active) {
			return (
				<a
					className='btn button button_dark-outline publish-offer__button'
					onClick={this.onChangeStatus(MyAdsStatus.Completed, id)}
				>
					Complete
				</a>
			);
		}

		return <div />;
	}

	Item = (props: { ad: IAds, onRemove: () => void }) => {
		const { ad, onRemove }     = props;
		const { title, id, price } = ad;

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
							<span className='d-inline-block offer-block__price'>{price}</span>
							<div className='publish-offer'>
								<this.ActiveButton id={ad.id} />
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
								<i className='watcher__icon fa fa-eye' /> <span>---</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	FilterButton = (props: { buttonFilter: MyAdsStatus, ads: IAds[] }) => {
		const { buttonFilter, ads } = props;

		const cont     = filterMyAds(buttonFilter, ads).length;
		const isActive = buttonFilter === this.state.selectedFilter;

		return (
			<div className={`filter-offer__item ${isActive ? 'link-active' : ''}`}>
				<a
					onClick={this.onSelectFilter(buttonFilter)}
					className='filter-offer__link'
				>
					{buttonFilter}
				</a>
				<span className='text_count-category'> {cont}</span>
			</div>
		);
	}

	componentDidMount(): void {
		this.props.adsActions.getMy.REQUEST({});
	}

	render() {
		const { isLoading, ads } = this.props.ads;

		if (isLoading) {
			return <h1>Loading...</h1>;
		}

		const selectedFilter = this.state.selectedFilter;
		const filteredAds    = filterMyAds(selectedFilter, ads);

		return (
			<>
				<div className='filter-offer d-flex'>
					<this.FilterButton
						buttonFilter={MyAdsStatus.Disapproved}
						ads={ads}
					/>
					<this.FilterButton
						buttonFilter={MyAdsStatus.Active}
						ads={ads}
					/>
					<this.FilterButton
						buttonFilter={MyAdsStatus.Completed}
						ads={ads}
					/>
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
					{
						filteredAds.map(ad => (
							<this.Item
								key={ad.id}
								ad={ad}
								onRemove={this.onRemove(ad.id)}
							/>
						))
					}
				</div>
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAds);