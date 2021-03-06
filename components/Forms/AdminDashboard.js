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
import { bulkUploadData, fetchInvestors, fetchStartups } from './api'
import styles from '../../styles/Dashboard.module.css'

import readXlsxFile from 'read-excel-file'
import XLSX from 'xlsx';
import { Spinner, Modal as Modal2, Table } from 'react-bootstrap'
import Modal from 'react-modal';
import './style-pro.css'
import 'bootstrap/dist/css/bootstrap.min.css';

var investorAttributes = [
  { label: 'First Name', attr: 'first_name' },
  { label: 'Last Name', attr: 'last_name' },
  { label: 'Email', attr: 'email' },
  { label: 'Phone Number', attr: 'phone_number' },
  { label: 'Website', attr: 'website' },
  { label: 'Country', attr: 'country' },
  { label: 'State', attr: 'state' },
  { label: 'Syndicate Group', attr: 'syndicate_group' },
  { label: 'Group Name', attr: 'group_name' },
  { label: 'Organization Name', attr: 'organization_name' }
]

var startupAttributes = [
  { label: 'First Name', attr: 'first_name' },
  { label: 'Last Name', attr: 'last_name' },
  { label: 'Email', attr: 'email' },
  { label: 'Phone Number', attr: 'phone_number' },
  { label: 'Website', attr: 'website' },
  { label: 'Country', attr: 'country' },
  { label: 'State', attr: 'state' },
  { label: 'Company', attr: 'company_name' },
  { label: 'Part Of Accelarator', attr: 'part_of_accelerator' },
  { label: 'Accelarator', attr: 'accelarator_name' }
]

function AdminDashboard(props) {
  const { t }   = props;
  const classes = useStyles();
  const text    = useText();
  const [values, setValues] = useState({
    file: ''
  });
  const router = useRouter();

  const [notificationMsg, setNotificationMsg] = useState('');
  const [openNotif, setNotif]   = useState(false);
  const [modal, setModal]       = useState(false);
  const [investorModal, setInvestorModal] = useState(false);
  const [startupModal, setStartupModal] = useState(false);
  const [response, setResponse] = useState(null);
  const [investorResponse, setInvestorResponse] = useState(null);
  const [startupResponse, setStartupResponse] = useState(null);
  const [loading, setLoading]   = useState(false);

  useEffect(function() {
    const token = localStorage.getItem('token');
    if (!token || token == "null") {
      router.push('/en/login');
    }
  },[]);

  function seeAllInvestors() {
    fetchInvestors()
      .then(response => {
        setInvestorModal(true);
        setInvestorResponse(response.data.investors);
      })
      .catch(errors => {
        setNotif(true);
        setNotificationMsg(errors.error);
      });
  }

  function seeAllStartups() {
    fetchStartups()
      .then(response => {
        setStartupModal(true);
        setStartupResponse(response.data.startups);
      })
      .catch(errors => {
        setNotif(true);
        setNotificationMsg(errors.error);
      });
  }

  const handleSubmit = () => {
    const fileUpload = document.getElementById('file');
    const regex      = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
      let fileName = fileUpload.files[0].name;
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
        if (reader.readAsBinaryString) {
          reader.onload = (e) => {
            const excelData = processExcel(reader.result);
            bulkUploadData({ data: excelData })
              .then(resp => {
                setModal(true);
                setResponse(resp.data.results);
              })
              .catch(errors => {
                setNotif(true);
                setNotificationMsg("Error occurred while uploading data");
              })
          };
          reader.readAsBinaryString(fileUpload.files[0]);
        }
      } else {
        setNotif(true);
        setNotificationMsg("This browser does not support HTML5.");
      }
    } else {
      setNotif(true);
      setNotificationMsg("Please upload a valid Excel file.");
    }
  };

  function processExcel(data) {
    const workbook   = XLSX.read(data, { type: 'binary' });
    const firstSheet = workbook.SheetNames[0];
    const excelRows  = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    var excelData = [];
    for(var i = 0; i < excelRows.length; i++) {
      excelData.push(excelRows[i]);
    }

    return excelData;
  }

  const handleClose = () => {
    setNotif(false);
  };

  return (
    <div className={classes.formWrap}>
      <Modal2
        show={modal}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal2.Header>
          <Modal2.Title>Results</Modal2.Title>
        </Modal2.Header>
        <Modal2.Body>
          <div style={{ margin: '0px 0px 30px 30px' }}>
            <h3 style={{ marginTop: '20px' }}>Summary of the Results</h3>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Row Number</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {
                  response?.map((item, index) =>
                    <tr key={index} className={ item.success ? 'text-success' : 'text-danger' }>
                      <td>{ item.row_number }</td>
                      <td>{ item.message }</td>
                    </tr>
                  )
                }
              </tbody>
            </Table>
          </div>
          <Button disabled={loading} style={{ margin: 'auto', display: 'block', width: '80%' }} onClick={ e => {
            setModal(false) } } variant="outlined" type="submit" color="primary" size="large">
            Back
          </Button>
          
        </Modal2.Body>
      </Modal2 >

      <Modal2
        show={investorModal}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal2.Header>
          <Modal2.Title>Investors</Modal2.Title>
        </Modal2.Header>
        <Modal2.Body>
          <div style={{ margin: '0px 0px 30px 30px', maxHeight: '500px', overflowY: 'auto' }}>
            <h3 style={{ marginTop: '20px' }}>Investors</h3>
            <div className="resources-container">
              {
                investorResponse?.map((item, index) =>
                  <div className="resource-container">
                    {
                      investorAttributes.map(attributes =>
                        <div className="resource-item">
                          <label>{ attributes['label'] }</label>
                          <p>{ item[attributes['attr']] }</p>
                        </div>
                      )
                    }
                  </div>
                )
              }
            </div>
          </div>
          <Button disabled={loading} style={{ margin: 'auto', display: 'block', width: '80%' }} onClick={ e => {
            setInvestorModal(false) } } variant="outlined" type="submit" color="primary" size="large">
            Back
          </Button>
        </Modal2.Body>
      </Modal2 >

      <Modal2
        show={startupModal}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal2.Header>
          <Modal2.Title>Startups</Modal2.Title>
        </Modal2.Header>
        <Modal2.Body>
          <div style={{ margin: '0px 0px 30px 30px', maxHeight: '500px', overflowY: 'auto' }}>
            <div className="resources-container">
              {
                startupResponse?.map((item, index) =>
                  <div className="resource-container">
                    {
                      startupAttributes.map(attributes =>
                        <div className="resource-item">
                          <label>{ attributes['label'] }</label>
                          <p>{ item[attributes['attr']] }</p>
                        </div>
                      )
                    }
                  </div>
                )
              }
            </div>
          </div>
          <Button disabled={loading} style={{ margin: 'auto', display: 'block', width: '80%' }} onClick={ e => {
            setStartupModal(false) } } variant="outlined" type="submit" color="primary" size="large">
            Back
          </Button>
        </Modal2.Body>
      </Modal2 >
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
          Dashboard
        </Typography>

        <div className={classes.form}>
          <ValidatorForm
            onSubmit={handleSubmit}
            onError={errors => console.log(errors)}
          >
            <Grid container>
              <Grid item xs={6}>
                <label htmlFor='file'>Upload a file</label>
              </Grid>
              <Grid item xs={6}>
                <input
                  type='file'
                  id='file'
                />
              </Grid>
            </Grid>
            <div className={classes.btnArea}>
              <Button variant="outlined" type="submit" color="primary" size="large" style={{ width: '60%', margin: 'auto'}}>
                Save
              </Button>
            </div>
          </ValidatorForm>
        </div>

        <div className={classes.btnArea} style={{ marginTop: 0 }}>
          <Button variant="outlined" type="button" color="primary" size="large" style={{ width: '30%', margin: 'auto', marginRight: '5%'}} onClick={ seeAllInvestors }>
            See All Investors
          </Button>

          <Button variant="outlined" type="button" color="primary" size="large" style={{ width: '30%', margin: 'auto', marginLeft: '5%'}} onClick={ seeAllStartups }>
            See All Startups
          </Button>
        </div>
      </Container>
    </div>
  );
}

AdminDashboard.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['common'])(AdminDashboard);