import React, { Fragment } from 'react';
import Head from 'next/head';
import brand from '~/public/text/brand';
import AdminLogin from '../components/Forms/AdminLogin';
import Decoration from '../components/Forms/Decoration';
import { withTranslation } from '../i18n';
import Header from '../components/Header/HeaderOther';

function Login(props) {
  const { onToggleDark, onToggleDir } = props;

  return (
    <Fragment>
      <Head>
        <title>
          {brand.agency.name}
          &nbsp; - Contact
        </title>
      </Head>
      <div>
        <Header
          onToggleDark={onToggleDark}
          onToggleDir={onToggleDir}
        />
        <Decoration />
        <AdminLogin />
      </div>
    </Fragment>
  );
}

Login.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Login);
