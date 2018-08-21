import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IRootState } from 'client/common/store/storeInterface';
import { Pagination as BPagination, PaginationItem, PaginationLink } from 'reactstrap';
import { IPagination } from 'client/ssr/pages/interfacePagination';
import { getQuery, getQueryLoop } from 'client/ssr/contexts/QueryContext';
import * as queryString from 'querystring';
import { queryStringifyPlus } from 'server/router/utils';
import { clearObject } from 'client/ssr/blocks/search/utils';

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

const DotDot = () => {
	return (
		<PaginationItem disabled>
			<PaginationLink>
				...
			</PaginationLink>
		</PaginationItem>
	);
};

class Pagination extends Component<IProps, IState> {

	state: IState = {};

	calcHrefGoPage = (currentPage: number) => {

		const newQueryParams = { ...getQueryLoop() };
		const clearQuery  = clearObject({ ...newQueryParams, page: currentPage });
		const queryParams = queryStringifyPlus(clearQuery);

		return '?' + queryParams;
	}

	render() {
		const { current_page, last_page } = this.props.pagination;

		const arr = Array(last_page).fill(0).map((item, index) => index+1).reduce((acc, item) => {
			if (current_page <= 6 && current_page >= last_page-5) {
				acc.push(item);
			} else if (current_page > 6 && current_page < last_page-5) {
				if (item >= current_page - 2 && item <= current_page + 2) {
					acc.push(item);
				}
			}else if (current_page <= 6) {
				if (item <= current_page+2) {
					acc.push(item);
				}
			} else if (current_page >= last_page-5) {
				if (item >= current_page-2) {
					acc.push(item);
				}
			} else {
				acc.push(0);
			}
			return acc;
		}, []);

		return (
			<>
				{ last_page !== 1 ?
					<BPagination >
						{
							current_page - 1 !== 0 &&
							<PaginationItem >
								<PaginationLink previous href={this.calcHrefGoPage(current_page - 1)} />
							</PaginationItem >
						}
						{ current_page > 6 ?
							<>
							{ [1,2,3].map(item => (
									<PaginationItem key={item}>
										<PaginationLink href={this.calcHrefGoPage(item)} >
											{item}
										</PaginationLink >
									</PaginationItem >
								))
							}
								<DotDot/>
							</>: null
						}
						{
							arr.map(item => (
								<PaginationItem key={item} active={current_page === item}>
									<PaginationLink href={this.calcHrefGoPage(item)} >
										{item}
									</PaginationLink >
								</PaginationItem >
							))
						}
						{ current_page < last_page - 5 ?
							<>
								<DotDot/>
								{ [last_page-2, last_page-1, last_page].map(item => (
									<PaginationItem key={item}>
										<PaginationLink href={this.calcHrefGoPage(item)} >
											{item}
										</PaginationLink >
									</PaginationItem >
								))
								}
							</>: null
						}
						{
							current_page + 1 <= last_page &&
							<PaginationItem >
								<PaginationLink next href={this.calcHrefGoPage(current_page + 1)} />
							</PaginationItem >
						}
					</BPagination >
					: null
				}
			</>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);