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
import StarRatings from 'react-star-ratings';
import useStyles from './form-style';
import Select from 'react-select';
import { RadioGroup, Radio } from 'react-radio-group'

var states = [
  { label: 'ALABAMA', value: 'AL' },
  { label: 'ALASKA', value: 'AK' },
  { label: 'AMERICAN SAMOA', value: 'AS' },
  { label: 'ARIZONA', value: 'AZ' },
  { label: 'ARKANSAS', value: 'AR' },
  { label: 'CALIFORNIA', value: 'CA' },
  { label: 'COLORADO', value: 'CO' },
  { label: 'CONNECTICUT', value: 'CT' },
  { label: 'DELAWARE', value: 'DE' },
  { label: 'DISTRICT OF COLUMBIA', value: 'DC' },
  { label: 'FEDERATED STATES OF MICRONESIA', value: 'FM' },
  { label: 'FLORIDA', value: 'FL' },
  { label: 'GEORGIA', value: 'GA' },
  { label: 'GUAM', value: 'GU' },
  { label: 'HAWAII', value: 'HI' },
  { label: 'IDAHO', value: 'ID' },
  { label: 'ILLINOIS', value: 'IL' },
  { label: 'INDIANA', value: 'IN' },
  { label: 'IOWA', value: 'IA' },
  { label: 'KANSAS', value: 'KS' },
  { label: 'KENTUCKY', value: 'KY' },
  { label: 'LOUISIANA', value: 'LA' },
  { label: 'MAINE', value: 'ME' },
  { label: 'MARSHALL ISLANDS', value: 'MH' },
  { label: 'MARYLAND', value: 'MD' },
  { label: 'MASSACHUSETTS', value: 'MA' },
  { label: 'MICHIGAN', value: 'MI' },
  { label: 'MINNESOTA', value: 'MN' },
  { label: 'MISSISSIPPI', value: 'MS' },
  { label: 'MISSOURI', value: 'MO' },
  { label: 'MONTANA', value: 'MT' },
  { label: 'NEBRASKA', value: 'NE' },
  { label: 'NEVADA', value: 'NV' },
  { label: 'NEW HAMPSHIRE', value: 'NH' },
  { label: 'NEW JERSEY', value: 'NJ' },
  { label: 'NEW MEXICO', value: 'NM' },
  { label: 'NEW YORK', value: 'NY' },
  { label: 'NORTH CAROLINA', value: 'NC' },
  { label: 'NORTH DAKOTA', value: 'ND' },
  { label: 'NORTHERN MARIANA ISLANDS', value: 'MP' },
  { label: 'OHIO', value: 'OH' },
  { label: 'OKLAHOMA', value: 'OK' },
  { label: 'OREGON', value: 'OR' },
  { label: 'PALAU', value: 'PW' },
  { label: 'PENNSYLVANIA', value: 'PA' },
  { label: 'PUERTO RICO', value: 'PR' },
  { label: 'RHODE ISLAND', value: 'RI' },
  { label: 'SOUTH CAROLINA', value: 'SC' },
  { label: 'SOUTH DAKOTA', value: 'SD' },
  { label: 'TENNESSEE', value: 'TN' },
  { label: 'TEXAS', value: 'TX' },
  { label: 'UTAH', value: 'UT' },
  { label: 'VERMONT', value: 'VT' },
  { label: 'VIRGIN ISLANDS', value: 'VI' },
  { label: 'VIRGINIA', value: 'VA' },
  { label: 'WASHINGTON', value: 'WA' },
  { label: 'WEST VIRGINIA', value: 'WV' },
  { label: 'WISCONSIN', value: 'WI' },
  { label: 'WYOMING', value: 'WY' }
]

const countries = [
  { value: "afghanistan", label: "Afghanistan" },
  { value: "aland_islands", label: "Aland Islands" },
  { value: "albania", label: "Albania" },
  { value: "algeria", label: "Algeria" },
  { value: "american_samoa", label: "American Samoa" },
  { value: "andorra", label: "Andorra" },
  { value: "angola", label: "Angola" },
  { value: "anguilla", label: "Anguilla" },
  { value: "antarctica", label: "Antarctica" },
  { value: "antigua_and_barbuda", label: "Antigua and Barbuda" },
  { value: "argentina", label: "Argentina" },
  { value: "armenia", label: "Armenia" },
  { value: "aruba", label: "Aruba" },
  { value: "australia", label: "Australia" },
  { value: "austria", label: "Austria" },
  { value: "azerbaijan", label: "Azerbaijan" },
  { value: "bahamas", label: "Bahamas" },
  { value: "bahrain", label: "Bahrain" },
  { value: "bangladesh", label: "Bangladesh" },
  { value: "barbados", label: "Barbados" },
  { value: "belarus", label: "Belarus" },
  { value: "belgium", label: "Belgium" },
  { value: "belize", label: "Belize" },
  { value: "benin", label: "Benin" },
  { value: "bermuda", label: "Bermuda" },
  { value: "bhutan", label: "Bhutan" },
  { value: "bolivia", label: "Bolivia" },
  { value: "bonaire", label: "Bonaire" },
  { value: "bosnia_and_herzegovina", label: "Bosnia and Herzegovina" },
  { value: "botswana", label: "Botswana" },
  { value: "bouvet_island", label: "Bouvet Island" },
  { value: "brazil", label: "Brazil" },
  { value: "brunei_darussalam", label: "Brunei Darussalam" },
  { value: "bulgaria", label: "Bulgaria" },
  { value: "burkina_faso", label: "Burkina Faso" },
  { value: "burundi", label: "Burundi" },
  { value: "cabo_verde", label: "Cabo Verde" },
  { value: "cambodia", label: "Cambodia" },
  { value: "cameroon", label: "Cameroon" },
  { value: "canada", label: "Canada" },
  { value: "cayman_islands", label: "Cayman Islands" },
  { value: "central_african_republic", label: "Central African Republic" },
  { value: "chad", label: "Chad" },
  { value: "chile", label: "Chile" },
  { value: "china", label: "China" },
  { value: "christmas_island", label: "Christmas Island" },
  { value: "cocos_islands", label: "Cocos Islands" },
  { value: "colombia", label: "Colombia" },
  { value: "comoros", label: "Comoros" },
  { value: "congo", label: "Congo" },
  { value: "congo", label: "Congo" },
  { value: "cook_islands", label: "Cook Islands" },
  { value: "costa_rica", label: "Costa Rica" },
  { value: "cote_d'ivoire", label: "Cote d'Ivoire" },
  { value: "croatia", label: "Croatia" },
  { value: "cuba", label: "Cuba" },
  { value: "curacao", label: "Curacao" },
  { value: "cyprus", label: "Cyprus" },
  { value: "czech_republic", label: "Czech Republic" },
  { value: "denmark", label: "Denmark" },
  { value: "djibouti", label: "Djibouti" },
  { value: "dominica", label: "Dominica" },
  { value: "dominican_republic", label: "Dominican Republic" },
  { value: "ecuador", label: "Ecuador" },
  { value: "egypt", label: "Egypt" },
  { value: "el_salvador", label: "El Salvador" },
  { value: "equatorial_guinea", label: "Equatorial Guinea" },
  { value: "eritrea", label: "Eritrea" },
  { value: "estonia", label: "Estonia" },
  { value: "ethiopia", label: "Ethiopia" },
  { value: "falkland_islands", label: "Falkland Islands" },
  { value: "faroe_islands", label: "Faroe Islands" },
  { value: "fiji", label: "Fiji" },
  { value: "finland", label: "Finland" },
  { value: "france", label: "France" },
  { value: "french_guiana", label: "French Guiana" },
  { value: "french_polynesia", label: "French Polynesia" },
  { value: "french_southern_territories", label: "French Southern Territories" },
  { value: "gabon", label: "Gabon" },
  { value: "gambia", label: "Gambia" },
  { value: "georgia", label: "Georgia" },
  { value: "germany", label: "Germany" },
  { value: "ghana", label: "Ghana" },
  { value: "gibraltar", label: "Gibraltar" },
  { value: "greece", label: "Greece" },
  { value: "greenland", label: "Greenland" },
  { value: "grenada", label: "Grenada" },
  { value: "guadeloupe", label: "Guadeloupe" },
  { value: "guam", label: "Guam" },
  { value: "guatemala", label: "Guatemala" },
  { value: "guernsey", label: "Guernsey" },
  { value: "guinea", label: "Guinea" },
  { value: "guinea-bissau", label: "Guinea-Bissau" },
  { value: "guyana", label: "Guyana" },
  { value: "haiti", label: "Haiti" },
  { value: "heard_and_mcdonald_islands", label: "Heard and McDonald Islands" },
  { value: "holy_see", label: "Holy See" },
  { value: "honduras", label: "Honduras" },
  { value: "hong_kong", label: "Hong Kong" },
  { value: "hungary", label: "Hungary" },
  { value: "iceland", label: "Iceland" },
  { value: "india", label: "India" },
  { value: "indonesia", label: "Indonesia" },
  { value: "iran", label: "Iran" },
  { value: "iraq", label: "Iraq" },
  { value: "ireland", label: "Ireland" },
  { value: "isle_of_man", label: "Isle of Man" },
  { value: "israel", label: "Israel" },
  { value: "italy", label: "Italy" },
  { value: "jamaica", label: "Jamaica" },
  { value: "japan", label: "Japan" },
  { value: "jersey", label: "Jersey" },
  { value: "jordan", label: "Jordan" },
  { value: "kazakhstan", label: "Kazakhstan" },
  { value: "kenya", label: "Kenya" },
  { value: "kiribati", label: "Kiribati" },
  { value: "korea", label: "Korea" },
  { value: "korea", label: "Korea" },
  { value: "kuwait", label: "Kuwait" },
  { value: "kyrgyzstan", label: "Kyrgyzstan" },
  { value: "lao_peoples", label: "Lao People's" },
  { value: "latvia", label: "Latvia" },
  { value: "lebanon", label: "Lebanon" },
  { value: "lesotho", label: "Lesotho" },
  { value: "liberia", label: "Liberia" },
  { value: "libya", label: "Libya" },
  { value: "liechtenstein", label: "Liechtenstein" },
  { value: "lithuania", label: "Lithuania" },
  { value: "luxembourg", label: "Luxembourg" },
  { value: "macao", label: "Macao" },
  { value: "macedonia", label: "Macedonia" },
  { value: "madagascar", label: "Madagascar" },
  { value: "malawi", label: "Malawi" },
  { value: "malaysia", label: "Malaysia" },
  { value: "maldives", label: "Maldives" },
  { value: "mali", label: "Mali" },
  { value: "malta", label: "Malta" },
  { value: "marshall_islands", label: "Marshall Islands" },
  { value: "martinique", label: "Martinique" },
  { value: "mauritania", label: "Mauritania" },
  { value: "mauritius", label: "Mauritius" },
  { value: "mayotte", label: "Mayotte" },
  { value: "mexico", label: "Mexico" },
  { value: "micronesia", label: "Micronesia" },
  { value: "moldova", label: "Moldova" },
  { value: "monaco", label: "Monaco" },
  { value: "mongolia", label: "Mongolia" },
  { value: "montenegro", label: "Montenegro" },
  { value: "montserrat", label: "Montserrat" },
  { value: "morocco", label: "Morocco" },
  { value: "mozambique", label: "Mozambique" },
  { value: "myanmar", label: "Myanmar" },
  { value: "namibia", label: "Namibia" },
  { value: "nauru", label: "Nauru" },
  { value: "nepal", label: "Nepal" },
  { value: "netherlands", label: "Netherlands" },
  { value: "new_caledonia", label: "New Caledonia" },
  { value: "new_zealand", label: "New Zealand" },
  { value: "nicaragua", label: "Nicaragua" },
  { value: "niger", label: "Niger" },
  { value: "nigeria", label: "Nigeria" },
  { value: "niue", label: "Niue" },
  { value: "norfolk_island", label: "Norfolk Island" },
  { value: "northern_mariana_islands", label: "Northern Mariana Islands" },
  { value: "norway", label: "Norway" },
  { value: "oman", label: "Oman" },
  { value: "pakistan", label: "Pakistan" },
  { value: "palau", label: "Palau" },
  { value: "palestine", label: "Palestine" },
  { value: "panama", label: "Panama" },
  { value: "papua_new_guinea", label: "Papua New Guinea" },
  { value: "paraguay", label: "Paraguay" },
  { value: "peru", label: "Peru" },
  { value: "philippines", label: "Philippines" },
  { value: "pitcairn", label: "Pitcairn" },
  { value: "poland", label: "Poland" },
  { value: "portugal", label: "Portugal" },
  { value: "puerto_rico", label: "Puerto Rico" },
  { value: "qatar", label: "Qatar" },
  { value: "reunion", label: "Reunion" },
  { value: "romania", label: "Romania" },
  { value: "russian_federation", label: "Russian Federation" },
  { value: "rwanda", label: "Rwanda" },
  { value: "saint_barthelemy", label: "Saint Barthelemy" },
  { value: "saint_helena", label: "Saint Helena" },
  { value: "saint_kitts_and_nevis", label: "Saint Kitts and Nevis" },
  { value: "saint_lucia", label: "Saint Lucia" },
  { value: "saint_martin", label: "Saint Martin" },
  { value: "saint_pierre_and_miquelon", label: "Saint Pierre and Miquelon" },
  { value: "saint_vincent_and_the_grenadines", label: "Saint Vincent and the Grenadines" },
  { value: "samoa", label: "Samoa" },
  { value: "san_marino", label: "San Marino" },
  { value: "sao_tome_and_principe", label: "Sao Tome and Principe" },
  { value: "saudi_arabia", label: "Saudi Arabia" },
  { value: "senegal", label: "Senegal" },
  { value: "serbia", label: "Serbia" },
  { value: "seychelles", label: "Seychelles" },
  { value: "sierra_leone", label: "Sierra Leone" },
  { value: "singapore", label: "Singapore" },
  { value: "sint_maarten", label: "Sint Maarten" },
  { value: "slovakia", label: "Slovakia" },
  { value: "slovenia", label: "Slovenia" },
  { value: "solomon_islands", label: "Solomon Islands" },
  { value: "somalia", label: "Somalia" },
  { value: "south_africa", label: "South Africa" },
  { value: "south_georgia", label: "South Georgia" },
  { value: "south_sudan", label: "South Sudan" },
  { value: "spain", label: "Spain" },
  { value: "sri_lanka", label: "Sri Lanka" },
  { value: "sudan", label: "Sudan" },
  { value: "suriname", label: "Suriname" },
  { value: "svalbard_and_jan mayen", label: "Svalbard and Jan Mayen" },
  { value: "swaziland", label: "Swaziland" },
  { value: "sweden", label: "Sweden" },
  { value: "switzerland", label: "Switzerland" },
  { value: "syrian_arab_republic", label: "Syrian Arab Republic" },
  { value: "taiwan", label: "Taiwan" },
  { value: "tajikistan", label: "Tajikistan" },
  { value: "tanzania", label: "Tanzania" },
  { value: "thailand", label: "Thailand" },
  { value: "timor_leste", label: "Timor Leste" },
  { value: "togo", label: "Togo" },
  { value: "tokelau", label: "Tokelau" },
  { value: "tonga", label: "Tonga" },
  { value: "trinidad_and_tobago", label: "Trinidad and Tobago" },
  { value: "tunisia", label: "Tunisia" },
  { value: "turkey", label: "Turkey" },
  { value: "turkmenistan", label: "Turkmenistan" },
  { value: "turks_and_caicos islands", label: "Turks and Caicos Islands" },
  { value: "tuvalu", label: "Tuvalu" },
  { value: "uganda", label: "Uganda" },
  { value: "ukraine", label: "Ukraine" },
  { value: "united_arab_emirates", label: "United Arab Emirates" },
  { value: "united_kingdom", label: "United Kingdom" },
  { value: "united_states_of america", label: "United States of America" },
  { value: "uruguay", label: "Uruguay" },
  { value: "uzbekistan", label: "Uzbekistan" },
  { value: "vanuatu", label: "Vanuatu" },
  { value: "venezuela", label: "Venezuela" },
  { value: "viet_nam", label: "Viet Nam" },
  { value: "virgin_islands", label: "Virgin Islands" },
  { value: "virgin_islands", label: "Virgin Islands" },
  { value: "wallis_and_futuna", label: "Wallis and Futuna" },
  { value: "western_sahara", label: "Western Sahara" },
  { value: "yemen", label: "Yemen" },
  { value: "zambia", label: "Zambia" },
  { value: "zimbabwe", label: "Zimbabwe" }
];



function Contact(props) {
  const { t } = props;
  const classes = useStyles();
  const text = useText();
  const [all, setAllValue] = useState({
    investment_stages: [
      { id: 1, value: 'pre_seeding_investing', checked: false, label: 'Pre-seed Investing' },
      { id: 2, value: 'seed_funding', checked: false, label: 'Seed Funding' },
      { id: 3, value: 'series', checked: false, label: 'Series A/B/C' },
      { id: 4, value: 'late_stage', checked: false, label: 'Late stage' }
    ]
  })

  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    website: '',
    country: '',
    state: '',
    syndicate_group: '',
    group_name: '',
    organization_name: '',
    investment_stages: []

  });

  useEffect(() => {
    ValidatorForm.addValidationRule('isTruthy', value => value);
  });

  const [openNotif, setNotif] = useState(false);

  const [check, setCheck] = useState(false);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = () => {
    setNotif(true);
  };

  const handleClose = () => {
    setNotif(false);
  };

  const handleSelectChange = name => item => {
    setValues({ ...values, [name]: item.value });
  }

  const handleRadioChange = name => item => {
    setValues({ ...values, [name]: item });
  }

  let handleCheckBoxesSelect = (name, payload, item_id) => {
    let new_array = payload.map(item => {
      if (item_id == item.id) {
        item.checked = !item.checked
      }
      return item
    })

    setAllValue({ ...all, [name]: new_array })

    let filtered_array = new_array.filter(item => item.checked == true)
    setValues({ ...values, [name]: filtered_array.map(item => item.value) })
  }

  console.log(values)

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
        message={<span id="message-id">Message Sent</span>}
      />
      <Hidden mdUp>
        <div className={clsx(classes.logo, classes.logoHeader)}>
          <a href={routeLink.agency.home}>
            <img src={logo} alt="logo" />
          </a>
        </div>
      </Hidden>
      <Hidden smDown>
        <IconButton href={routeLink.agency.home} className={classes.backtohome}>
          <i className="ion-ios-home-outline" />
          <i className="ion-ios-arrow-thin-left" />
        </IconButton>
      </Hidden>
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom className={text.title}>
          {/* {t('common:contact_title')} */}
          Investor Details
        </Typography>
        <Typography className={clsx(classes.desc, text.subtitle2)}>
          Our platform provides best startups suggestions to you
        </Typography>
        <div className={classes.form}>
          <ValidatorForm
            onSubmit={handleSubmit}
            onError={errors => console.log(errors)}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextValidator
                  className={classes.input}
                  label={"First Name"}
                  onChange={handleChange('first_name')}
                  name="first_name"
                  value={values.first_name}
                  validators={['required']}
                  errorMessages={['This field is required']}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  className={classes.input}
                  label={"Last Name"}
                  onChange={handleChange('last_name')}
                  name="last_name"
                  value={values.last_name}
                  validators={['required']}
                  errorMessages={['This field is required']}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  className={classes.input}
                  label={"Phone Number"}
                  onChange={handleChange('phone_number')}
                  name="phone_number"
                  value={values.phone_number}
                  validators={['required']}
                  errorMessages={['This field is required']}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  className={classes.input}
                  label={"Email"}
                  onChange={handleChange('email')}
                  name="email"
                  value={values.email}
                  validators={['required', 'isEmail']}
                  errorMessages={['This field is required']}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  className={classes.input}
                  label={"Website"}
                  onChange={handleChange('website')}
                  name="website"
                  value={values.website}
                  validators={['required']}
                  errorMessages={['This field is required']}
                />
              </Grid>
              <Grid item xs={12}>
                <span style={{ fontSize: '15px', marginTop: '10px', marginBottom: '10px', display: 'block' }}>
                  Select Country
                </span>
                <Select
                  options={countries}
                  value={values.country}
                  onChange={handleSelectChange("country")}
                />
              </Grid>
              <Grid item xs={12}>
                <span style={{ fontSize: '15px', marginTop: '10px', marginBottom: '10px', display: 'block' }}>
                  What state are you located (US only)
                </span>
                <Select
                  options={states}
                  value={values.state}
                  onChange={handleSelectChange("state")}
                />
              </Grid>
              <Grid item xs={12}>
                <span style={{ fontSize: '15px', marginTop: '10px', marginBottom: '10px', display: 'block' }}>
                  Are you part of an Angel group or Syndicate?
                </span>
                <RadioGroup name="syndicate_group" selectedValue={values.syndicate_group} onChange={handleRadioChange("syndicate_group")}>
                  <div style={{ marginTop: '5px' }}><Radio value="yes" /> YES</div>
                  <div style={{ marginTop: '10px' }}><Radio value="no" /> NO</div>
                </RadioGroup>
              </Grid>

              <Grid item xs={12}>
                <TextValidator
                  className={classes.input}
                  label={"What is the name of your group?"}
                  onChange={handleChange('group_name')}
                  name="group_name"
                  value={values.group_name}
                />
              </Grid>

              <Grid item xs={12}>
                <TextValidator
                  className={classes.input}
                  label={"Organization Name"}
                  onChange={handleChange('organization_name')}
                  name="organization_name"
                  value={values.organization_name}
                />
              </Grid>

              <Grid item xs={12}>
                <span style={{ fontSize: '15px', marginTop: '20px', marginBottom: '10px', display: 'block' }}>
                  What stage would you like to invest in? Select ALL that apply.
                </span>

                {all.investment_stages.map(stage =>
                  <div><FormControlLabel
                    id={stage.id}
                    control={(
                      <Checkbox
                        checked={stage.checked}
                        value={stage.value}
                        onChange={() => handleCheckBoxesSelect("investment_stages", all.investment_stages, stage.id)}
                        color="primary"
                      />
                    )}
                    label={(
                      <span>
                        {stage.label}
                      </span>
                    )}
                  /></div>
                )
                }
              </Grid>
            </Grid>
            <div className={classes.btnArea}>
              <Button style={{ margin: 'auto' }} variant="outlined" type="submit" color="primary" size="large">
                Save Record
                {/* <SendIcon className={classes.rightIcon} /> */}
              </Button>

              <Button style={{ margin: 'auto' }} onClick={e => {
                e.preventDefault()
              }} variant="outlined" type="submit" color="primary" size="large">
                Suggest Startups
                {/* <SendIcon className={classes.rightIcon} /> */}
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
