import React from 'react'
import { types } from 'redux-act';
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import configureStore from '../src/common/store';


class ExampleApp extends App {
  static async getInitialProps({Component, ctx}) {
    types.clear();
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {pageProps}
  }
  
  props: any;

  render() {
    const {Component, pageProps, store} = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withRedux(() => configureStore)(withReduxSaga(ExampleApp));