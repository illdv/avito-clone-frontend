import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';

export interface IState {

}

export interface IProps {
	list: object[];
	showIfListEmpty?: boolean;
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
		const { showIfListEmpty } = this.props;

		const rules: Array<(item: any) => boolean> = [
			isNotNull,
		];

		if (showIfListEmpty) {
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