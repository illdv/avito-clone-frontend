import * as React from 'react';
import { Component } from 'react';

export interface IState {

}

export interface IProps {
	list: object[];
	hideIfListEmpty?: boolean;
}

const isNotNull = (item: any): boolean => {
	return !!item;
};

const isListEmpty = (item: any[]): boolean => {
	return item.length !== 0;
};

class ShowArray extends Component<IProps, IState> {

	state: IState = {};

	createRules = () => {
		const { hideIfListEmpty } = this.props;

		const rules: Array<(item: any) => boolean> = [
			isNotNull,
		];

		if (hideIfListEmpty) {
			rules.push(isListEmpty);
		}

		return rules;
	}

	checkAllRules = (): boolean => {
		const { list } = this.props;

		const rules = this.createRules();

		const results = rules.map(run => run(list));

		return results.every(result => result === true);
	}

	render() {

		const { children } = this.props;

		const isAllRulesTrue = this.checkAllRules();

		if (isAllRulesTrue) {
			return children;
		}

		return null;
	}
}

export default ShowArray;