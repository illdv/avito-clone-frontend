import React from 'react';
import Head from 'next/head'

import { withI18next } from '../common/lib/withI18next';
import ModalWindow from '../src/common/modalWindow/ModalWindow'

interface IIndexProps {
  t: any;
}

export class Index extends React.Component<IIndexProps> {
  static async getInitialProps({ qyery }) {

  }

  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <Head>
          <meta property="og:description" content='Content'/>
          <title>Index page</title>
          <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB"
                crossOrigin="anonymous"/>
          <link
            href='https://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic'
            rel='stylesheet' type='text/css'/>
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css"
                integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt"
                crossOrigin="anonymous"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3mobile.css"/>
        </Head>
        <ModalWindow/>
      </React.Fragment>
    )
  }
}

export default withI18next(['home', 'common'])(Index);