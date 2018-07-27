import React from 'react';
import { connect, Dispatch } from 'react-redux';
import {IAds} from 'client/common/ads/interface';
import AdCard from 'client/ssr/blocks/ads/components/AdCard';
import { bindModuleAction } from 'client/common/user/utils';
import { IUserActions, UserActions } from 'client/common/user/actions';
import { IRootState } from '../../../common/store/storeInterface';

require('./Ads.sass');

export {IAds};

export interface IAdsProps {
	user: IUser;
	title: string;
	ads: IAds[];
	userActions: IUserActions;
}

class Ads extends React.PureComponent<IAdsProps> {
	addToFavorites = (id: string) => {
		this.props.userActions.selectFavorite.REQUEST({ id });

	};

	render() {
		const {ads, title} = this.props;

		return (
			<section className='section-sm'>
				<div className='container'>
					<div className='row'>
						<div className='col-12'>
							<h3 className='m-b-20'>{title}</h3>
						</div>
					</div>
					<div className='row'>
						{
							ads && ads.map((ad: IAds) => (
								<div
									key={ad.id}
									className='col-md-4 col-lg-3'
								>
									<AdCard user={this.props.user} ads={ad} addToFavorites={this.addToFavorites}/>
								</div>
							))
						}
					</div>
				</div>
			</section>
		);
	}
}

const mapStateToProps = (state: IRootState) => ({
	user: state.user.user,
});

const mapDispatchToProps = dispatch => ({
	userActions: bindModuleAction(UserActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ads);
