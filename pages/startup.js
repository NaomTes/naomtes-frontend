import React, { Fragment } from 'react';
import Head from 'next/head';
import brand from '~/public/text/brand';
import StartupForm from '../components/Forms/Startup';
import Decoration from '../components/Forms/Decoration';
import { withTranslation } from '../i18n';
import Header from '../components/Header/HeaderOther';


function Startup(props) {
  const { onToggleDark, onToggleDir } = props;
  return (
    <Fragment>
      <Head>
        <title>
          {brand.agency.name}
          &nbsp; - Startups
        </title>
      </Head>
      <div>
        <Header
          onToggleDark={onToggleDark}
          onToggleDir={onToggleDir}
        />
        <Decoration />
        <StartupForm />
      </div>
    </Fragment>
  );
}

Startup.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Startup);
