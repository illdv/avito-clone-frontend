import * as React from 'react';
import { connect } from 'react-redux';

import { Route, Redirect, Switch as SwitchRoute } from 'react-router-dom';
import { IRootState } from '../../common/store/storeInterface';

import { CustomStorage } from 'client/common/entities/user/CustomStorage';

class PrivareWrap extends React.Component<any> {
	render() {
		if (CustomStorage.getToken()) {
			return this.props.children;
		} else {
			location.href = '/';
			return null;
		}
	}
}

export default PrivareWrap;
