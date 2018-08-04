import React from 'react';

class UpdateDidRender extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	render() {
		return this.props.children;
	}
}

export default UpdateDidRender;