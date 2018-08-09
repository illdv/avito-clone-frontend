import createHistory from 'history/createBrowserHistory';

export const isServer: boolean = typeof window === 'undefined';

export default isServer ? null : createHistory();