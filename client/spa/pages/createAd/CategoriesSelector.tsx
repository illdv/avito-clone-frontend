import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { IRootState } from 'client/common/store/storeInterface';
import { ICategory } from 'client/ssr/blocks/categories/interface';

export interface IState {
	selectedCategories: ICategory[][];
}

export interface IProps {
	categories: ICategory[];
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

export class CategoriesSelector extends Component<IProps, IState> {

	state: IState = {
		selectedCategories: [[this.props.categories[0]]],
	};

	render() {
		return (
			<div className='select-category'>
				{this.state.selectedCategories.map((categories: ICategory[]) => (
					<CategoriesList listItems={categories} />
				))}
			</div>
		);
	}
}

const CategoriesList = ({ listItems }: { listItems: ICategory[] }) => (
	<div className='select-column w-25'>
		<div className='select-colunm__title'>Categories</div>
		{listItems.map(category => (
			<a
				key={category.id}
				href=''
				className='select-colunm__category'
			>
				{category.title}
			</a>
		))}
	</div>
);

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesSelector);