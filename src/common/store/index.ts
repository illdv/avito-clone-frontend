import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers';
import saga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
let middleware = [thunk, sagaMiddleware];

if (process.env.NODE_ENV !== 'production' && !(typeof window === 'undefined')) {
    const { logger } = require('redux-logger');
    middleware = [ ...middleware, logger ];
}

const createCustomStore = (() => {
    const store: any = createStore(reducer, {}, composeWithDevTools(applyMiddleware(...middleware)));

    store.runSagaTask = () => {
        store.sagaTask =  sagaMiddleware.run(saga);
    };
    store.runSagaTask();

    return store;
})();

export default createCustomStore;
