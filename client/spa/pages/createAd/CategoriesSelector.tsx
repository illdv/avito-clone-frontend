import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';

import { IRootState } from 'client/common/store/storeInterface';
import { ICategory } from 'client/common/categories/interface';
import { bindModuleAction } from 'client/common/user/utils';
import { CategoryActions, ICategoryActions } from 'client/common/categories/actions';
import { ICategoryState } from 'client/common/categories/reducer';
import { isContainsId, useOrDefault } from 'client/spa/pages/createAd/utils';

export interface IState {
	selectedCategory: ICategory[];
}

export interface IProps {
	categoryActions: ICategoryActions;
	categories: ICategoryState;
	onSelectCategory: (selectedCategory: ICategory[]) => void;
}

const mapStateToProps = (state: IRootState) => ({
	categories: state.categories,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
	categoryActions: bindModuleAction(CategoryActions, dispatch),
});

export class CategoriesSelector extends Component<IProps, IState> {

	state: IState = {
		selectedCategory: [],
	};

	onClickCategory = (selectCategory: ICategory) => () => {

		let selectedCategory = this.state.selectedCategory;

		const repeatedCategoryIndex = selectedCategory.findIndex(category =>
			category.id === selectCategory.id || category.parent_id === selectCategory.parent_id,
		);

		if (repeatedCategoryIndex >= 0) {
			selectedCategory = selectedCategory.slice(0, repeatedCategoryIndex);
		}

		const newSelectedCategory = [
			...selectedCategory,
			selectCategory,
		];

		this.props.onSelectCategory(newSelectedCategory);

		this.setState({ selectedCategory: newSelectedCategory });
	}

	toItem = (category: ICategory): ICategoryListItem => {
		const { id, title, children } = category;

		const isActive = this.state.selectedCategory.some(isContainsId(id));

		return {
			id,
			isActive,
			title,
			countChildren: children.length,
			onClick: this.onClickCategory(category),
		};
	}

	renderCategory = (category: ICategory) => {
		if (useOrDefault(() => category.children.length, 0) > 0) {
			return (
				<CategoryList
					key={category.id}
					items={category.children.map(this.toItem)}
					title={category.title}
				/>
			);
		} else {
			return <div />;
		}
	}

	componentDidMount(): void {
		this.props.categoryActions.loading.REQUEST({});
	}

	render() {
		const categories = this.props.categories.data;
		return (
			<div className='select-category'>
				<CategoryList
					items={categories.map(this.toItem)}
					title={'Categories'}
				/>
				{
					this.state.selectedCategory.map(this.renderCategory)
				}
			</div>
		);
	}
}

function activeClassName(isActive: boolean) {
	if (isActive) {
		return 'select-colunm__category select-colunm__category_active';
	} else {
		return 'select-colunm__category';
	}
}

interface ICategoryListItem {
	id: string;
	title: string;
	isActive: boolean;
	countChildren: number;
	onClick: () => void;
}

interface ICategoryListProps {
	items: ICategoryListItem[];
	title: string;
}

const CategoryList = ({ items, title }: ICategoryListProps) => (
	<div
		className='select-column w-25'
		style={{ maxWidth: '25%' }}
	>
		<div className='select-colunm__title'>{title}</div>
		{
			items.map(item => (
				<a
					key={item.id}
					onClick={item.onClick}
					className={activeClassName(item.isActive)}
				>
					{`${item.title} ${item.countChildren}`}
				</a>
			))
		}
	</div>
);

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesSelector);