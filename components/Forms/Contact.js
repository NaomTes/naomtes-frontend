import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Container from '@material-ui/core/Container';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import routeLink from '~/public/text/link';
import { useText } from '~/theme/common';
import logo from '~public/images/logo-agency.png';
import { withTranslation } from '~/i18n';
import Checkbox from './Checkbox';
import useStyles from './form-style';
import { contactUs } from './api';

function Contact(props) {
  const { t } = props;
  const classes = useStyles();
  const text = useText();
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  useEffect(() => {
    ValidatorForm.addValidationRule('isTruthy', value => value);
  });

  const [notificationMsg, setNotificationMsg] = useState('');
  const [openNotif, setNotif] = useState(false);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = () => {
    contactUs({ contact_us: values })
      .then(response => {
        setNotif(true);
        setNotificationMsg(response.data.message);
      })
    // setNotif(true);
  };

  const handleClose = () => {
    setNotif(false);
  };

  return (
    <div className={classes.formWrap}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        key="top right"
        open={openNotif}
        autoHideDuration={4000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={notificationMsg}
      />
      <Hidden mdUp>
        <div className={clsx(classes.logo, classes.logoHeader)}>
          <a href={routeLink.agency.home}>
            <img src={logo} alt="logo" />
          </a>
        </div>
      </Hidden>
      {/* <Hidden smDown>
        <IconButton href={routeLink.agency.home} className={classes.backtohome}>
          <i className="ion-ios-home-outline" />
          <i className="ion-ios-arrow-thin-left" />
        </IconButton>
      </Hidden> */}
      <Container maxWidth="md">
        <Typography style={{ paddingTop: '40px' }} variant="h3" gutterBottom className={text.title}>
          Register for Update
        </Typography>

        <div className={classes.form}>
          <ValidatorForm
            onSubmit={handleSubmit}
            onError={errors => console.log(errors)}
          >
            <Grid container spacing={6}>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  className={classes.input}
                  label={t('Name')}
                  onChange={handleChange('name')}
                  name="Name"
                  value={values.name}
                  validators={['required', 'maxStringLength: 255']}
                  errorMessages={['This field is required', 'Max character limit is 255']}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  className={classes.input}
                  label={t('Email')}
                  onChange={handleChange('email')}
                  name="Email"
                  value={values.email}
                  validators={['required', 'isEmail', 'maxStringLength: 255']}
                  errorMessages={['This field is required', 'email is not valid', 'Max character limit is 255']}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  className={classes.input}
                  label={t('Phone Number')}
                  onChange={handleChange('phone')}
                  name="Phone"
                  validators={['maxStringLength: 255']}
                  errors={['Max character limit is 255']}
                  value={values.phone}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  className={classes.input}
                  label={'Company'}
                  onChange={handleChange('company')}
                  name="Company"
                  validators={['maxStringLength: 255']}
                  errors={['Max character limit is 255']}
                  value={values.company}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  multiline
                  rows="6"
                  className={classes.input}
                  label={t('common:form_message')}
                  onChange={handleChange('message')}
                  name="Message"
                  value={values.message}
                />
              </Grid>
            </Grid>
            <div className={classes.btnArea}>
              <Button variant="outlined" type="submit" size="large" style={{ backgroundColor: '#2196F3', color: 'white' }}>
                {t('common:form_send')}
                <SendIcon className={classes.rightIcon} />
              </Button>
            </div>
          </ValidatorForm>
        </div>
      </Container>
    </div>
  );
}

Contact.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['common'])(Contact);
