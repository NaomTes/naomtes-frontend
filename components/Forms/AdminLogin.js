import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
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
import { adminLogin } from './api'

function Contact(props) {
  // useEffect(function() {
  //   const token = localStorage.getItem('token');
  //   if (token && token != "null") {
  //     router.push('/en/admin/dashboard');
  //   }
  // },[]);

  const { t } = props;
  const classes = useStyles();
  const text = useText();
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const router = useRouter();

  const [notificationMsg, setNotificationMsg] = useState('');
  const [openNotif, setNotif] = useState(false);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = () => {
    adminLogin({ user: values })
      .then(response => {
        router.push('/en/admin/dashboard');
      })
      .catch(errors => {
        setNotif(true);
        setNotificationMsg(errors.error);
      });
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
      <Container maxWidth="md">
        <Typography style={{ paddingTop: '40px' }} variant="h3" gutterBottom className={text.title}>
          Login
        </Typography>

        <div className={classes.form}>
          <ValidatorForm
            onSubmit={handleSubmit}
            onError={errors => console.log(errors)}
          >
            <Grid container>
              <Grid item xs={12}>
                <TextValidator
                  className={classes.input}
                  label={t('Email')}
                  onChange={handleChange('email')}
                  name="Email"
                  value={values.email}
                  validators={['required', 'isEmail']}
                  errorMessages={['This field is required', 'email is not valid']}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  className={classes.input}
                  label={t('Password')}
                  onChange={handleChange('password')}
                  name="Password"
                  value={values.password}
                  type="password"
                />
              </Grid>
            </Grid>
            <div className={classes.btnArea}>
              <Button variant="outlined" type="submit" color="primary" size="large">
                Login
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
