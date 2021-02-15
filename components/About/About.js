import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withTranslation } from '~/i18n';
import { useText } from '~/theme/common';
import TitleDeco from '../Title/WithDecoration';
import useStyles from './about-style';
import useTitle from '../Title/title-style';
import Counter from '../Counter';

function About(props) {
  // Theme breakpoints
  const theme = useTheme();
  const text = useText();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  // Translation function
  const { t } = props;

  const classes = useStyles();
  const title = useTitle();
  return (
    <div className={classes.root}>
      <Container fixed>
        <Grid container spacing={6}>
          <Grid style={{ marginTop: '150px' }} item md={5} xs={12}>
            <div>
              <TitleDeco text={t('common:agency-landing.about_title')} />
              {isDesktop && (
                <div className={classes.puzzle}>
                  <div className={classes.pieceBig}>
                    <span />
                  </div>
                  <div className={classes.pieceSmallTop}>
                    <span />
                  </div>
                  <div className={classes.pieceSmallBottom}>
                    <span />
                  </div>
                </div>
              )}
            </div>
          </Grid>
          <Grid item md={7} xs={12}>
            <Typography style={{ height: '400px' }} className={clsx(title.default, text.subtitle)} variant="h4">
              Our platform is a next generation global platform that connects investors with a diversified set of startups across industries , emerging technologies and minority groups. It is driven by data analytics and scientific research of past deal flow.
            </Typography>
          </Grid>

          {/* <Grid item xs={12}>
            <Typography style={{ height: '400px' }} className={clsx(title.default, text.subtitle)} variant="h4">
              VC Connector platform was developed with a simple mission: eliminating barriers faced by women and minorities throughout the VC ecosystem.

              VC Connector provides direct access to investors without the need to incur expensive travel cost associated with in-person meetings.

              Register to our platform and let us pre-select VCs that would support and potentially invest in your startup ideas.
            </Typography>
          </Grid> */}
        </Grid>
      </Container>
    </div>
  );
}

About.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation(['agency-landing'])(About);
