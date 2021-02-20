import React, { Fragment } from 'react';
import Head from 'next/head';
import brand from '~/public/text/brand';
import ContactFrm from '../components/Forms/Contact';
import Decoration from '../components/Forms/Decoration';
import { withTranslation } from '../i18n';
import Header from '../components/Header/HeaderOther';

function Contact(props) {
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
        <ContactFrm />
      </div>
    </Fragment>
  );
}

Contact.getInitialProps = async () => ({
  namespacesRequired: ['common'],
});

export default withTranslation('common')(Contact);
