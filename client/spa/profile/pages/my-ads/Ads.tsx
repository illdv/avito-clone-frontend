import React from 'react';
import { Link } from 'react-router-dom';
import { extractPreviewImage } from 'client/ssr/blocks/ad/utils';
import { editAdPagePathCreator } from 'client/spa/profile/constants';
import { IActiveButtonConfig } from 'client/spa/profile/interfaces/controlButtons';
import ControlGroupButtons from 'client/spa/profile/pages/my-ads/components/ControlGroupButtons';
import ActiveButton from 'client/spa/profile/pages/my-ads/components/ActiveButton';
import CreateAdvertisementButton from 'client/spa/profile/pages/my-ads/components/CreateAdvertisementButton';

interface IProps {
	ads: IAd[];
	enabledEdit: boolean;
	activeButtons: IActiveButtonConfig[];
	noContent?: string;
	submitAd?: boolean;
}

interface ISelectedAd {
	selected: Set<number>;
	selectedAll: boolean;
}

class Ads extends React.Component<IProps, ISelectedAd> {
	selectedAll     = (id: number[]) => {
		let { selected, selectedAll } = this.state;
		if (selectedAll) {
			selected.clear();
		} else {
			selected = this.collectionIdAds(id);
		}

		this.setState({
			selected: selected,
			selectedAll: !selectedAll,
		});
	};
	selectedCurrent = (e) => {
		let { selected, selectedAll } = this.state;
		if (e.target.checked) {
			selected.add(Number(e.target.value));
		} else {
			selected.delete(Number(e.target.value));
		}
		if (selectedAll) {
			selectedAll = !selectedAll;
		}
		if (selected.size === this.props.ads.length) {
			selectedAll = true;
		}

		this.setState({ selected, selectedAll });
	};

	formationToSet = (id: number) => {
		const format = new Set();
		return format.add(id);
	};

	constructor(props, context) {
		super(props, context);

		this.state = {
			selected: new Set(),
			selectedAll: false,
		};
	}

	render() {
		return (
			<>{
				  this.props.ads.length !== 0 &&
				  <ControlGroupButtons
					  ads={this.props.ads}
					  options={this.props.activeButtons}
					  changeAll={this.selectedAll}
					  selectedAll={this.state.selectedAll}
					  selectedIds={this.state.selected}
				  />
			  }
			  {
				  this.props.ads.map(ad => (
					  <div
						  key={ad.id}
						  className='offer-block__item'
					  >
						  <input
							  className='custom-checkbox'
							  type='checkbox'
							  value={ad.id}
							  onChange={this.selectedCurrent}
							  checked={this.state.selectedAll || this.state.selected.has(ad.id)}
						  />

						  <div className='offer-block__inner'>
							  <div className='row'>
								  <div className='col-9 d-flex'>
									  <a href={`/ad/${ad.id}`}>
										  <img
											  alt=''
											  src={extractPreviewImage(ad)}
											  className='offer-block__img'
										  />
									  </a>
									  <div className='offer-block__info'>
										  <div>
											  <a href={`/ad/${ad.id}`}>
												  <h5>{ad.title}</h5>
											  </a>
											  <span className='d-inline-block offer-block__price'>{ad.price}</span>
										  </div>
										  <div className='publish-offer'>
											  {
												  this.props.activeButtons.map(activeButton => (
													  <ActiveButton
														  id={this.formationToSet(ad.id)}
														  option={activeButton}
														  key={activeButton.label}
													  />
												  ))
											  }
										  </div>
									  </div>
								  </div>
								  <div className='col-3 text-right edit-block'>
									  <Link
										  to={editAdPagePathCreator(ad.id)}
										  className='edit-block__link'
									  >
										  Edit
									  </Link>
									  <div className='watcher'>
										  <i className='watcher__icon fa fa-eye' /> <span>{ad.total_visits}</span>
									  </div>
								  </div>
							  </div>
						  </div>
					  </div>
				  ))
			  }
			  {
				  this.props.ads.length === 0 &&
				  <>
					  <span className='no-content'>{this.props.noContent}</span>
					  <div className='row'>
						  {
							  this.props.submitAd &&
							  <>
								  <div className='col-4'>
									  <CreateAdvertisementButton
										  className={
											  'btn orange-btn-outline publish-offer__button publish-offer__button_min-padding'}
									  />
								  </div>
							  </>
						  }
					  </div>
				  </>
			  }
			</>
		);
	}

	private collectionIdAds(ids: number[]) {
		const idsList = new Set();
		ids.forEach(ad => idsList.add(ad));

		return idsList;
	}
}

export default Ads;