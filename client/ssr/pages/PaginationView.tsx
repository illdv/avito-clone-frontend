import * as React from 'react';
import { Component } from 'react';
import { PaginationItem, PaginationLink } from 'reactstrap';
import { Pagination as BPagination } from 'reactstrap';

export interface IPaginationItem {
	text?: string;
	href?: string;
	isButtonNext?: boolean;
	isButtonPrevious?: boolean;
	isActive?: boolean;
}

export interface IState {
}

export interface IProps {
	items: IPaginationItem[];
}

class PaginationView extends Component<IProps, IState> {

	state: IState = {};

	render() {
		const { items } = this.props;
		return (
			<BPagination>
				{
					items.map(item => (
						<PaginationItem active={item.isActive}>
							<PaginationLink
								next={item.isButtonNext}
								previous={item.isButtonPrevious}
								href={item.href}
							>
								{item.text}
							</PaginationLink>
						</PaginationItem>
					))
				}
			</BPagination>
		);
	}
}

export default PaginationView;