import createHistory from 'history/createBrowserHistory';

const isServer: boolean = typeof window === 'undefined';

export default isServer ? null : createHistory();