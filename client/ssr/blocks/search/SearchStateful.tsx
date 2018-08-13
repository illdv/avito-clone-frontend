import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IRootState } from 'client/common/store/storeInterface';
import { bindModuleAction } from 'client/common/entities/user/utils';
import { ISearchActions, SearchActions } from 'client/common/search/actions';
import { getQueryLoop } from 'client/ssr/contexts/QueryContext';
import Search from 'client/ssr/blocks/search/Search';
import { IQuery } from 'client/common/search/interface'

export interface IState {

}

export interface IProps {
	searchActions: ISearchActions;
	query: IQuery;
}

const mapStateToProps = (state: IRootState) => ({
	search: state.search,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
	searchActions: bindModuleAction(SearchActions, dispatch),
});

class SearchStateful extends Component<IProps, IState> {

	state: IState = {};

	componentDidMount(): void {
		const { searchActions } = this.props;
		searchActions.initialize.REQUEST({ query: getQueryLoop() });
	}

	onSearch = () => {

	}

	render() {

		const { query } = this.props;

		return <Search onSearch={this.onSearch()} query={query} priceRange={true} />;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchStateful);