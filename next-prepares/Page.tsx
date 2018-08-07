import React from 'react';

export class NextJSPageWithPrepares<T, P> extends React.Component<T, P> {

	static prepares: string[];
	static freshPrepares: string[];

}

export default NextJSPageWithPrepares;