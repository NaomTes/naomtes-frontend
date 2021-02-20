import React, { Fragment } from 'react';
import Head from 'next/head';
import brand from '~/public/text/brand';
import InvestorForm from '../components/Forms/Investor';
import Decoration from '../components/Forms/Decoration';
import { withTranslation } from '../i18n';
import Header from '../components/Header/HeaderOther';


function Investor(props) {
  const { onToggleDark, onToggleDir } = props;
  return (
    <Fragment>
      <Head>
        <title>
          {brand.agency.name}
          &nbsp; - Investors
        </title>
      </Head>
      <div>
        <Header
          onToggleDark={onToggleDark}
          onToggleDir={onToggleDir}
        />
        <Decoration />
        <InvestorForm />
      </div>
    </Fragment>
  );
}

Investor.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Investor);
