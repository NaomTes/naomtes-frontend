import React, { Fragment } from 'react';
import Head from 'next/head';
import brand from '~/public/text/brand';
import ContactFrm from '../components/Forms/Contact';
import Decoration from '../components/Forms/Decoration';
import { withTranslation } from '../i18n';

function Startup() {
  return (
    <Fragment>
      <Head>
        <title>
          {brand.agency.name}
          &nbsp; - Startups
        </title>
      </Head>
      <div>
        <Decoration />
        <ContactFrm />
      </div>
    </Fragment>
  );
}

Startup.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Startup);
