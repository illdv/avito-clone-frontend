import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IRootState } from 'client/common/store/storeInterface';
import { Pagination as BPagination, PaginationItem, PaginationLink } from 'reactstrap';
import { IPagination } from 'client/ssr/pages/interfacePagination';
import { getQuery, getQueryLoop } from 'client/ssr/contexts/QueryContext'
import * as queryString from 'querystring'

export interface IState {

}

export interface IProps {
	pagination: IPagination;
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

class Pagination extends Component<IProps, IState> {

	state: IState = {};

	calcHrefGoPage = (currentPage: number) => {
		const { pagination } = this.props;

		const newQueryParams = { ...getQueryLoop() };
		const searchUrl      = queryString.stringify({ ...newQueryParams, currentPage });

		return '?' + searchUrl;
	}

	render() {
		const { current_page, last_page } = this.props.pagination;

		return (
			<BPagination >
				{
					current_page - 1 !== 0 &&
					<PaginationItem >
						<PaginationLink previous href={this.calcHrefGoPage(current_page - 1)} />
					</PaginationItem >
				}
				{
					Array(last_page).fill(0).map((item, index) => (
						<PaginationItem active={current_page === index + 1}>
							<PaginationLink href={this.calcHrefGoPage(index + 1)} >
								{index + 1}
							</PaginationLink >
						</PaginationItem >
					))
				}
				{
					current_page + 1 <= last_page &&
					<PaginationItem >
						<PaginationLink next href={this.calcHrefGoPage(current_page + 1)} />
					</PaginationItem >
				}
			</BPagination >
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);