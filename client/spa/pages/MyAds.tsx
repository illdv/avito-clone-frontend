import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IRootState } from 'client/common/store/storeInterface';
import { bindModuleAction } from 'client/common/user/utils';
import { AdsActions, IAdsActions } from 'client/common/ads/actions';
import { IAdsState } from 'client/common/ads/reducer';
import { AdsActionType, IAds, MyAdsStatus } from 'client/common/ads/interface';
import { filterMyAds } from 'client/spa/pages/utils';
import { extractPreviewImage } from 'client/ssr/blocks/ad/utils';

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

	onEdit = (id: string) => () => {
		this.props.adsActions.selectForEdit.REQUEST({ id });
	}

	onChangeActive = (id: string) => () => {
		this.props.adsActions.changeStatus.REQUEST({ actionType: AdsActionType.Activate, id });
		this.props.adsActions.changeStatus.REQUEST({ actionType: AdsActionType.Approve, id });
	}

	onChangeComplete = (id: string) => () => {
		this.props.adsActions.changeStatus.REQUEST({ actionType: AdsActionType.Complete, id });
		this.props.adsActions.changeStatus.REQUEST({ actionType: AdsActionType.Deactivate, id });
	}

	ActiveButton = ({ id }: { id: string }) => {
		const { selectedFilter } = this.state;
		if (selectedFilter === MyAdsStatus.Disapproved) {
			return (
				<a
					className='btn orange-btn-outline publish-offer__button'
					onClick={this.onChangeActive(id)}
				>
					Activate
				</a>
			);
		}

		if (selectedFilter === MyAdsStatus.Active) {
			return (
				<a
					className='btn orange-btn-outline publish-offer__button'
					onClick={this.onChangeComplete(id)}
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
				{/*<input
					className='custom-checkbox'
					type='checkbox'
				/>*/}
				<div className='offer-block__inner'>
					<div className='row'>
						<div className='col-9 d-flex'>
							<a href={`/ad/${id}`}>
								<img
									src={extractPreviewImage(ad)}
									alt=''
									className='offer-block__img'
								/>
							</a>
							<div className='offer-block__info'>
								<div>
									<a href={`/ad/${id}`}>
										<h5>{title}</h5>
									</a>
									<span className='d-inline-block offer-block__price'>{price}</span>
								</div>
								<div className='publish-offer'>
									<this.ActiveButton id={ad.id} />
									<a
										onClick={onRemove}
										className='btn grey-btn-outline publish-offer__button'
									>
										Remove
									</a>
								</div>
							</div>
						</div>
						<div className='col-3 text-right edit-block'>
							<a
								onClick={this.onEdit(ad.id)}
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
			<a
				onClick={this.onSelectFilter(buttonFilter)}
				className={`filter-offer__link ${isActive ? 'link-active' : ''}`}
			>
				{buttonFilter}
				<span className='grey-text'> {cont}</span>
			</a>

		);
	}

	componentDidMount(): void {
		this.props.adsActions.getMy.REQUEST({});
	}

	render() {
		const { isLoading, ads } = this.props.ads;

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
				<div className='all-offers-selector'>
					{/*<input
						className='custom-checkbox'
						type='checkbox'
					/>
					<button className='btn orange-btn-outline all-offers-selector__btn'>
						Active
					</button>
					<button className='btn grey-btn-outline all-offers-selector__btn'>
						Remove
					</button>*/}
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