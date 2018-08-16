import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IRootState } from 'client/common/store/storeInterface';
import { Pagination as BPagination, PaginationItem, PaginationLink } from 'reactstrap';
import { IPagination } from 'client/ssr/pages/interfacePagination';
import { getQueryLoop } from 'client/ssr/contexts/QueryContext';
import * as queryString from 'querystring';

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
		const searchUrl      = queryString.stringify({ ...newQueryParams, page: currentPage });

		return '?' + searchUrl;
	};

	formationPagination = (currentPage: number, lastPage: number) => {
		return Array(lastPage).fill(0).map((index, item) => {
			if (Math.abs(item + 1 - currentPage) < 6 || item + 1 === lastPage) {
				if (Math.abs(item + 1 - currentPage) > 7) {
					return (
						<DotDot key={item + 1} />
					);
				} else if (Math.sign(item + 5 - currentPage) === -1 ) {
					return (
						<DotDot key={item + 1}/>
					);
				} else {
					return (
						<PaginationItem
							key={item + 1}
							active={currentPage === item + 1}
						>
							<PaginationLink href={this.calcHrefGoPage(item + 1)}>
								{item + 1}
							</PaginationLink>
						</PaginationItem>
					);
				}
			}
		});
	};

	render() {
		const { current_page, last_page } = this.props.pagination;

		return (
			<BPagination>
				{
					current_page - 1 !== 0 &&
					<PaginationItem>
						<PaginationLink
							previous
							href={this.calcHrefGoPage(current_page - 1)}
						/>
					</PaginationItem>
				}
				{
					current_page === last_page &&
					<PaginationItem>
						<PaginationLink
							href={this.calcHrefGoPage(1)}
						>
							1
						</PaginationLink>
					</PaginationItem>
				}
				{
					this.formationPagination(current_page, last_page)
				}
				{
					current_page + 7 < last_page &&
					<PaginationItem>
						<PaginationLink
							href={this.calcHrefGoPage(last_page)}
						>
							{last_page}
						</PaginationLink>
					</PaginationItem>
				}
				{
					current_page + 1 <= last_page &&
					<PaginationItem>
						<PaginationLink
							next
							href={this.calcHrefGoPage(current_page + 1)}
						/>
					</PaginationItem>
				}
			</BPagination>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);