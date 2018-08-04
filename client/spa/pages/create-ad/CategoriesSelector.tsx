import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';

import { IRootState } from 'client/common/store/storeInterface';
import { ICategory } from 'client/common/categories/interface';
import { bindModuleAction } from 'client/common/user/utils';
import { CategoryActions, ICategoryActions } from 'client/common/categories/actions';
import { ICategoryState } from 'client/common/categories/reducer';
import { isContainsId, useOrDefault } from 'client/spa/pages/create-ad/utils';

export interface IState {
	selectedCategory: ICategory[];
	defaultCategoryId: string;
}

export interface IProps {
	selectedCategories: ICategory[];
	categoryActions: ICategoryActions;
	categories: ICategoryState;
	onSelectCategories: (selectedCategories: ICategory[]) => void;
	defaultCategoryId: string;
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
		defaultCategoryId: null,
	};

	static getDerivedStateFromProps(nextProps: IProps, prevState: IState): IState {

		const { defaultCategoryId, categories } = nextProps;
		const { data }                          = categories;

		if (data.length !== 0) {
			if (defaultCategoryId !== null && defaultCategoryId !== prevState.defaultCategoryId) {
				// noinspection TsLint
				const selectedCategory = findCategoriesQueueById(data, parseInt(defaultCategoryId));

				if (JSON.stringify(selectedCategory.sort()) !== JSON.stringify(nextProps.selectedCategories.sort())) {
					nextProps.onSelectCategories(selectedCategory);
				} else {
					return {
						defaultCategoryId,
						selectedCategory,
					};
				}
			}
		}
		return null;
	}

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

		this.props.onSelectCategories(newSelectedCategory);

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
			return <div key={0} />;
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

export const findCategoriesQueueById = (categories: ICategory[], findId): any[] | null => {
	if (!findId) {
		return [];
	}

	return categories.reduce((acc, category) => {
		if (acc) {
			return acc;
		}

		const id = category.id;

		if (id === findId) {
			return [category];
		} else {
			if (category.children.length > 0) {
				const result = findCategoriesQueueById(category.children, findId);

				if (result !== null) {
					return [category].concat(result);
				} else {
					return null;
				}
			} else {
				return null;
			}
		}
	}, false as any);
};

function activeClassName(isActive: boolean) {
	if (isActive) {
		return 'select-column__category select-column__category--active';
	} else {
		return 'select-column__category';
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
		<div className='select-column__category'>{title}</div>
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