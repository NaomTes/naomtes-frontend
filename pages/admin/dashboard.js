import React, { Fragment } from 'react';
import Head from 'next/head';
import brand from '~/public/text/brand';
import AdminDashboard from '../../components/Forms/AdminDashboard';
import Decoration from '../../components/Forms/Decoration';
import { withTranslation } from '../../i18n';
import Header from '../../components/Header/HeaderOther';

function Dashboard(props) {
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
        <AdminDashboard />
      </div>
    </Fragment>
  );
}

Dashboard.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Dashboard);
