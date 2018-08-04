import React from 'react';
import { Link } from 'react-router-dom';

import { extractPreviewImage } from 'client/ssr/blocks/ad/utils';
import { editAdPagePathCreator } from 'client/spa/profile/constants';

export interface IActiveButtonConfig {
	label: string;
	className: string;
	callback(id: number): void;
}

interface IProps {
	ads: IAd[];
	enabledEdit: boolean;
	activeButtons: IActiveButtonConfig[];
	selected?: (id: number[]) => void;
}

const ActiveButton: React.SFC<{ id: number, config: IActiveButtonConfig }> = ({ id, config }) => {
	const initCallback = () => config.callback(id);
	return (
		<a
			onClick={initCallback}
			className={config.className}
		>
			{config.label}
		</a>
	);
};

class Ads extends React.Component<IProps> {
	constructor(props, context) {
		super(props, context);
	}

	selectAd = (e) => {
		this.props.selected([e.target.value]);
	};
	render() {
		return this.props.ads.map(ad => (
			<div
				key={ad.id}
				className='offer-block__item'
			>
				<input
					className='custom-checkbox'
					type='checkbox'
					value={ad.id}
					onChange={this.selectAd}
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
											<ActiveButton key={activeButton.label} id={ad.id} config={activeButton} />
										))
									}
								</div>
							</div>
						</div>
						<div className='col-3 text-right edit-block'>
							<Link to={editAdPagePathCreator(ad.id)} className='edit-block__link'>
								Edit
							</Link>
							<div className='watcher'>
								<i className='watcher__icon fa fa-eye' /> <span>{ad.total_visits}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		));
	}
}

export default Ads;