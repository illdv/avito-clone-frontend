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
import Pagination from 'client/ssr/pages/Pagination';
import PaginationView, { IPaginationItem } from 'client/ssr/pages/PaginationView';

export interface IState {

}

export interface IProps {
	pagination: IPagination;
}

class PaginationStateful extends Component<IProps, IState> {

	state: IState = {};

	calcHrefGoPage = (currentPage: string) => {

		const newQueryParams = { ...getQueryLoop() };
		const clearQuery  = clearObject({ ...newQueryParams, page: currentPage });
		const queryParams = queryStringifyPlus(clearQuery);

		return '?' + queryParams;
	}

	extractItems = (arr: string[], currentPage: number, lastPage: number): IPaginationItem[] => {
		const center: IPaginationItem[] = arr.map(item => ({
			text: item,
			isActive: Number(item) === Number(currentPage),
			href:  this.calcHrefGoPage(item),
		}));

		if (currentPage > 6) {
			return [
				{
					isButtonPrevious: true
				},
				{
					isActive: true,
					text: '1'
				},
				{
					text: '2'
				},
				{
					text: '3'
				},
				...center
			];
		}

		if (current_page < 6) {
			return [
				{
					isButtonPrevious: true
				},
				{
					isActive: true,
					text: '1'
				},
				{
					text: '2'
				},
				{
					text: '3'
				},
				...center
			];
		}
		return [];
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
				acc.push('?');
			}
			return acc;
		}, []);

		const items = this.extractItems(arr, current_page, last_page);

		return <PaginationView items={items}/>;
	}
}

export default PaginationStateful;