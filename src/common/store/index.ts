import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

import reducer from './reducers';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
let middleware = [thunk, sagaMiddleware];

if (process.env.NODE_ENV !== 'production' && !(typeof window === 'undefined')) {
    const { logger } = require('redux-logger');
    middleware = [ ...middleware, logger ];
}

export default function(initialState = {}) {
    const store: any = createStore(reducer, initialState, applyMiddleware(...middleware));

    store.runSagaTask = () => {
        store.sagaTask =  sagaMiddleware.run(saga);
    };
    store.runSagaTask();

    return store;
}