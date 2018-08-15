import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'client/common/store/storeInterface';
import { bindModuleAction } from 'client/common/entities/user/utils';
import { ISearchActions, SearchActions } from 'client/common/search/actions';
import { getQueryLoop } from 'client/ssr/contexts/QueryContext';
import Search from 'client/ssr/blocks/search/Search';
import { ISearchState } from 'client/common/search/store';
import { getSearchUrlLoop } from 'client/ssr/contexts/SearchUrlContext';

export interface ISearchBreadcrumbs {
	categories: ICategory[];
	location: {
		country_id?: number,
		region_id?: number,
		city_id?: number,
		title?: string,
	};
}

export interface IState {

}

export interface IProps {
	searchActions: ISearchActions;
	search?: ISearchState;
	locationName: string;
}

const mapStateToProps = (state: IRootState) => ({
	search: state.search,
});

const mapDispatchToProps = dispatch => ({
	searchActions: bindModuleAction(SearchActions, dispatch),
});

class SearchStateful extends Component<IProps, IState> {

	state: IState = {};

	componentWillMount(): void {
		const { searchActions } = this.props;
		searchActions.initialize.REQUEST({ query: getQueryLoop(), queryString: getSearchUrlLoop() });
	}

	onSearch = () => {
		//
	}

	render() {

		const { query, queryString } = this.props.search;

		return (
			<Search
				onSearch={this.onSearch()}
				locationName={this.props.locationName}
				query={query}
				urlString={queryString}
				priceRange={true}
			/>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchStateful);