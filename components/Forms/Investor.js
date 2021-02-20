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
import useStyles from './form-style-pro';
import Select from 'react-select';
import { RadioGroup, Radio } from 'react-radio-group'
import { Spinner, Modal as Modal2 } from 'react-bootstrap'
import './style-pro.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Progress from 'react-progressbar'

import { createInvestor, startupSuggestion } from './api'
import Modal from 'react-modal';

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
  { value: "united_states_of_america", label: "United States of America" },
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


import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


function Contact(props) {
  const { t } = props;
  const classes = useStyles();
  const text = useText();
  const [formikHook, setFormikHook] = useState(false)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const defaultValues = {
    investment_stages: [
      { id: 1, value: 'pre_seeding_investing', checked: false, label: 'Pre-seed Investing' },
      { id: 2, value: 'seed_funding', checked: false, label: 'Seed Funding' },
      { id: 3, value: 'seriesA', checked: false, label: 'Series A' },
      { id: 4, value: 'seriesB', checked: false, label: 'Series B' },
      { id: 5, value: 'seriesC', checked: false, label: 'Series C' },
      { id: 6, value: 'late_stage', checked: false, label: 'Late stage' }
    ],
    last_investment_stages: [
      { id: 1, value: 'pre_seeding_investing', checked: false, label: 'Pre-seed Investing' },
      { id: 2, value: 'seed_funding', checked: false, label: 'Seed Funding' },
      { id: 3, value: 'seriesA', checked: false, label: 'Series A' },
      { id: 4, value: 'seriesB', checked: false, label: 'Series B' },
      { id: 5, value: 'seriesC', checked: false, label: 'Series C' },
      { id: 6, value: 'late_stage', checked: false, label: 'Late stage' }
    ],
    investment_category: [
      { id: 1, value: 'banking', checked: false, label: 'Banking' },
      { id: 2, value: 'telecom', checked: false, label: 'Telecom' },
      { id: 3, value: 'pharma', checked: false, label: 'Pharma' },
      { id: 4, value: 'oil_and_gas', checked: false, label: 'Oil and Gas' },
      { id: 5, value: 'interactive_media', checked: false, label: 'Interactive media' },
      { id: 6, value: 'automotive', checked: false, label: 'Automotive' },
      { id: 7, value: 'consumer_electronics', checked: false, label: 'Consumer electronics' },
      { id: 8, value: 'e_commerce', checked: false, label: 'e-commerce' },
      { id: 9, value: 'others', checked: false, label: 'Others' },
    ],
    investment_industry: [
      { id: 1, value: 'banking', checked: false, label: 'Banking' },
      { id: 2, value: 'telecom', checked: false, label: 'Telecom' },
      { id: 3, value: 'pharma', checked: false, label: 'Pharma' },
      { id: 4, value: 'oil_and_gas', checked: false, label: 'Oil and Gas' },
      { id: 5, value: 'interactive_media', checked: false, label: 'Interactive media' },
      { id: 6, value: 'automotive', checked: false, label: 'Automotive' },
      { id: 7, value: 'consumer_electronics', checked: false, label: 'Consumer electronics' },
      { id: 8, value: 'e_commerce', checked: false, label: 'e-commerce' },
      { id: 9, value: 'others', checked: false, label: 'Others' },
    ],
    emerging_technologies: [
      { id: 1, value: 'ai', checked: false, label: 'Machine Learning & AI' },
      { id: 2, value: 'fintech', checked: false, label: 'Fintech' },
      { id: 3, value: 'iot', checked: false, label: 'Internet of Things (IoT)' },
      { id: 4, value: '5G', checked: false, label: '5G Solutions' },
      { id: 5, value: 'bio_tech', checked: false, label: 'Biotech & Precision Genomics' },
      { id: 6, value: 'cloud_computing', checked: false, label: 'Cloud Computing' },
      { id: 7, value: 'cyber_security', checked: false, label: 'Cyber security' },
      { id: 8, value: 'enterprise_technology', checked: false, label: 'Enterprise Technology' },
      { id: 9, value: 'consumer_technology', checked: false, label: 'Consumer Technology' },
      { id: 10, value: 'others', checked: false, label: 'Others' },
    ],
    previous_emerging_technologies: [
      { id: 1, value: 'ai', checked: false, label: 'Machine Learning & AI' },
      { id: 2, value: 'fintech', checked: false, label: 'Fintech' },
      { id: 3, value: 'iot', checked: false, label: 'Internet of Things (IoT)' },
      { id: 4, value: '5G', checked: false, label: '5G Solutions' },
      { id: 5, value: 'bio_tech', checked: false, label: 'Biotech & Precision Genomics' },
      { id: 6, value: 'cloud_computing', checked: false, label: 'Cloud Computing' },
      { id: 7, value: 'cyber_security', checked: false, label: 'Cyber security' },
      { id: 8, value: 'enterprise_technology', checked: false, label: 'Enterprise Technology' },
      { id: 9, value: 'consumer_technology', checked: false, label: 'Consumer Technology' },
      { id: 10, value: 'others', checked: false, label: 'Others' },
    ]
  }
  const [all, setAllValue] = useState(defaultValues)
  const [modal, setModal] = useState(false)
  const [response, setResponse] = useState(null)


  const defaultQuery = {
    // Manual Ratings
    investment_stages: 5, // 1 -> being highest
    investment_category: 5,
    investment_rates: 5,// 1 -> being highest
    emerging_technologies: 4,

    investment_industry: 4,
    previous_emerging_technologies: 4,

    country: 5,

  }

  const [query, setQuery] = useState(defaultQuery)
  const [notificationMsg, setNotificationMsg] = useState('')

  const defaultObject = {
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
    investment_stages: [],
    last_investment_stages: [],
    investment_rates: '',
    investment_category: [],
    investment_industry: [],
    emerging_technologies: [],
    previous_emerging_technologies: [],
    founder_type: '',
    about_us: '',


    startup_selected: []
  }

  const [values, setValues] = useState(defaultObject);

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ValidatorForm.addValidationRule('isTruthy', value => value);
  });

  const [openNotif, setNotif] = useState(false);

  const [showState, setShowState] = useState(false);

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  let validationsFailed = () => {
    setFormikHook(true)

    if (values.country === '') {
      setNotif(true);
      setNotificationMsg("Please Select Country!")
      return true
    } else if (values.country === 'united_states_of_america') {
      if (values.state === "") {
        setNotif(true);
        setNotificationMsg("Please Select State!")
        return true
      }
    }

    if (values.investment_stages.length == 0 || values.investment_category.length == 0 || values.emerging_technologies.length == 0 || values.last_investment_stages.length == 0 || values.previous_emerging_technologies.length == 0 || values.investment_industry.length == 0) {
      setNotif(true);
      setNotificationMsg("Please fill out the missing fields!")
      return true
    }

    if (values.investment_rates == "") {
      setNotif(true);
      setNotificationMsg("Please fill out the missing fields!")
      return true
    }
    return false;
  }

  const handleSubmit = e => {
    if (values.startup_selected.length == 0) {
      setNotif(true);
      setNotificationMsg("Select one startup!")
      return;
    }

    setLoading(true)

    createInvestor({ investors: values })
      .then(response => {
        console.log("response -> ", response)
        setNotif(true);
        setNotificationMsg("Record Inserted!")
        setModal(false)
        setValues(defaultObject)
        setAllValue(defaultValues)
        setQuery(defaultQuery)
        setFormikHook(false)

      })
      .catch((errors) => {
        setNotif(true);
        setNotificationMsg("Something Went Wrong!")
      })
      .finally(() => {
        setLoading(false)
      });
  };

  let handleStartupSuggestion = e => {
    e.preventDefault()

    if (validationsFailed())
      return

    // let processedQuery = true;
    // Object.values(query).forEach(item => {
    //   if (item == 0) processedQuery = false
    // })
    // if (!processedQuery) {
    //   setNotif(true);
    //   setNotificationMsg("Please fill out the missing fields!")
    //   return
    // }

    setLoading(true)

    let queryPayload = JSON.parse(JSON.stringify(query))

    if (values.country == "united_states_of_america") {
      queryPayload.state = 5
    }

    startupSuggestion({
      investor: values,
      ratings: queryPayload
    })
      .then(({ results }) => {

        setValues({ ...values, startup_selected: [] })

        setModal(true)
        setResponse(results)
        setNotif(true);
        console.log(response)
        setNotificationMsg("Results are processed!")

      })
      .catch((errors) => {
        setNotif(true);
        setNotificationMsg("Something Went Wrong!")
      })
      .finally(() => {
        setLoading(false)
      });

  }

  const handleClose = () => {
    setNotif(false);
  };

  const handleSelectChange = name => item => {

    if (name === "country") {
      if (item.value === "united_states_of_america")
        setShowState(true)
      else
        setShowState(false)
    }

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

  // let handleRatings = (newRating, name) => {
  //   setQuery({ ...query, [name]: newRating + 1 })
  // }

  let handleStartupChange = (e) => {

    if (e.target.checked) {
      let acceptItemArray = [...values.startup_selected]
      acceptItemArray.push(e.target.value)

      setValues({ ...values, startup_selected: acceptItemArray })
    }
    else {
      let rejectItemArray = [...values.startup_selected]
      rejectItemArray = rejectItemArray.filter(item => item != e.target.value)

      setValues({ ...values, startup_selected: rejectItemArray })
    }
  }

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
            {response?.length == 0 ?
              <h3 style={{ marginTop: '40px' }}>No Startups are added in the system</h3>
              : <h3 style={{ marginTop: '20px' }}>These are your potential startups matches</h3>
            }

            {
              response?.map((item, index) =>
                <div key={index}>
                  <input type="checkbox" name="startup_selected" onChange={handleStartupChange} value={`${item.id}`} id={`top_${item.id}`} />
                  <label for={`top_${item.id}`} style={{ marginTop: '20px', marginLeft: '15px', display: 'inline-block', fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>{`${item.company_name} (${item.match_score}%)`}</label>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <label style={{ fontSize: '16px', marginBottom: '5px' }}>{`Phone: `}<b>{`${item.phone_number}`}</b></label>
                    <label style={{ fontSize: '16px', marginBottom: '5px' }}>{`Email: `}<b>{`${item.email}`}</b></label>
                    <label />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <label style={{ fontSize: '16px', marginBottom: '5px' }}>{`Summary: `}<b>{`${item.value_preposition}`}</b></label>
                    <label />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <label style={{ fontSize: '16px', marginBottom: '5px' }}>{`URL: `}<a href={item.website} target="_blank" >{item.website}</a></label>
                  </div>
                  <div style={{ width: '100%', marginBottom: '30px' }}>
                    <Progress completed={item.match_score} />
                  </div>
                </div>
              )
            }
          </div>

          <Button onClick={() => {
            handleSubmit()
          }} disabled={loading} style={{ margin: 'auto', marginBottom: '15px', display: 'block', width: '80%' }} variant="outlined" color="primary" size="large">
            Save Record
        </Button>

          <Button disabled={loading} style={{ margin: 'auto', display: 'block', width: '80%' }} onClick={e => {
            setModal(false)
          }} variant="outlined" type="submit" color="primary" size="large">
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
          {/* {t('common:contact_title')} */}
          Investors
        </Typography>
        <div className={classes.form}>
          <ValidatorForm
            onSubmit={handleStartupSuggestion}
            onError={errors => console.log(errors)}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <TextValidator
                  className={classes.input}
                  label={"First Name *"}
                  onChange={handleChange('first_name')}
                  name="first_name"
                  value={values.first_name}
                  validators={['required', 'matchRegexp:^[a-zA-Z ]*$']}
                  errorMessages={['This field is required', 'Only words are allowed']}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  className={classes.input}
                  label={"Last Name *"}
                  onChange={handleChange('last_name')}
                  name="last_name"
                  value={values.last_name}
                  validators={['required', 'matchRegexp:^[a-zA-Z ]*$']}
                  errorMessages={['This field is required', 'Only words are allowed']}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  className={classes.input}
                  label={"Phone Number"}
                  onChange={handleChange('phone_number')}
                  name="phone_number"
                  value={values.phone_number}
                  validators={['matchRegexp:^[+][0-9]*$']}
                  errorMessages={['Only numbers are allowed']}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  className={classes.input}
                  label={"Email **"}
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
                />
              </Grid>
              <Grid item xs={12}>
                <span style={{ fontSize: '15px', marginTop: '10px', marginBottom: '10px', display: 'block', color: `${formikHook && values.country == "" ? 'red' : 'black'}` }}>
                  Select Country *
                </span>
                <Select
                  options={countries}
                  value={countries.find(item => item.value == values.country)}
                  onChange={handleSelectChange("country")}
                />
              </Grid>
              {showState && <Grid item xs={12}>
                <span style={{ fontSize: '15px', marginTop: '10px', marginBottom: '10px', display: 'block', color: `${formikHook && values.state == "" ? 'red' : 'black'}` }}>
                  What state are you located (US only) *
                </span>
                <Select
                  options={states}
                  value={states.find(item => item.value == values.state)}
                  onChange={handleSelectChange("state")}
                />
              </Grid>}
              <Grid item xs={12}>
                <span style={{ fontSize: '15px', marginTop: '10px', marginBottom: '10px', display: 'block' }}>
                  Are you part of an Angel group or Syndicate?
                </span>
                <RadioGroup name="syndicate_group" selectedValue={values.syndicate_group} onChange={handleRadioChange("syndicate_group")}>
                  <div style={{ marginTop: '5px' }}><Radio value="yes" id="yes_1" /> <label for="yes_1">YES</label></div>
                  <div style={{ marginTop: '10px' }}><Radio value="no" id="no_1" /> <label for="no_1">NO</label> </div>
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

              <Grid item xd={12}>
                <span style={{ fontSize: '15px', marginTop: '20px', marginBottom: '10px', display: 'block', color: `${formikHook && values.investment_stages.length == 0 ? 'red' : 'black'}` }}>
                  What stage would you like to invest in? (Please select ALL that apply.) *
                </span>
              </Grid>

              {/* <Grid item xs={12} md={4}>
                <div style={{ paddingTop: '15px' }}>
                  <StarRatings
                    rating={query.investment_stages - 1}
                    starRatedColor="orange"
                    changeRating={handleRatings}
                    numberOfStars={5}
                    name='investment_stages'
                    starDimension={"25px"}
                  />
                </div>
              </Grid> */}

              <Grid style={{ paddingTop: '0px' }} item xs={12}>
                {all.investment_stages.map(stage =>
                  <div><FormControlLabel
                    id={stage.id}
                    control={(
                      <Checkbox
                        checked={stage.checked}
                        value={stage.value}
                        onChange={() => handleCheckBoxesSelect("investment_stages", all.investment_stages, stage.id)}
                        color="black"
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

              <Grid style={{ paddingTop: '0px' }} item xs={12}>
                <span style={{ fontSize: '15px', marginTop: '20px', marginBottom: '10px', display: 'block', color: `${formikHook && values.last_investment_stages.length == 0 ? 'red' : 'black'}` }}>
                  What was the last equity investment round you invested? *
                </span>

                {all.last_investment_stages.map(stage =>
                  <div><FormControlLabel
                    id={stage.id}
                    control={(
                      <Checkbox
                        checked={stage.checked}
                        value={stage.value}
                        onChange={() => handleCheckBoxesSelect("last_investment_stages", all.last_investment_stages, stage.id)}
                        color="black"
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

              <Grid item xs={12}>
                <span style={{ fontSize: '15px', marginTop: '10px', marginBottom: '10px', display: 'block', color: `${formikHook && values.investment_rates == '' ? 'red' : 'black'}` }}>
                  How much are you looking to invest in given deal?*
                </span>
              </Grid>

              {/* <Grid item xs={12} md={4}>
                <div style={{ paddingTop: '5px' }}>
                  <StarRatings
                    rating={query.investment_rates - 1}
                    starRatedColor="orange"
                    changeRating={handleRatings}
                    numberOfStars={5}
                    name='investment_rates'
                    starDimension={"25px"}
                  />
                </div>
              </Grid> */}

              <Grid style={{ paddingTop: '0px' }} item xs={12}>
                <RadioGroup name="investment_rates" selectedValue={values.investment_rates} onChange={handleRadioChange("investment_rates")}>
                  <div style={{ marginTop: '15px', fontSize: '15px' }}><Radio value="25K" id="1_25K" /> <label for="1_25K">$25,000-$100,000</label></div>
                  <div style={{ marginTop: '10px', fontSize: '15px' }}><Radio value="100K" id="1_100k" /> <label for="1_100k">$100,000-$500,000</label></div>
                  <div style={{ marginTop: '10px', fontSize: '15px' }}><Radio value="500K" id="1_500k" /> <label for="1_500k">$500,000-$1,000,000</label></div>
                  <div style={{ marginTop: '10px', fontSize: '15px' }}><Radio value="1M" id="1_1M" /> <label for="1_1M">Above $1M</label></div>
                </RadioGroup>
              </Grid>

              <Grid style={{ paddingRight: '0px' }} item xs={12}>
                <span style={{ fontSize: '15px', marginTop: '20px', marginBottom: '10px', display: 'block', color: `${formikHook && values.investment_category.length == 0 ? 'red' : 'black'}` }}>
                  Which category would you be interested to invest in? (Please select ALL that apply.) *
                </span>
              </Grid>

              {/* <Grid item xs={12} md={4}>
                <div style={{ paddingTop: '15px' }}>
                  <StarRatings
                    rating={query.investment_category - 1}
                    starRatedColor="orange"
                    changeRating={handleRatings}
                    numberOfStars={5}
                    name='investment_category'
                    starDimension={"25px"}
                  />
                </div>
              </Grid> */}

              <Grid style={{ paddingTop: '0px' }} item xs={12}>
                {all.investment_category.map(category =>
                  <div><FormControlLabel
                    id={category.id}
                    control={(
                      <Checkbox
                        checked={category.checked}
                        value={category.value}
                        onChange={() => handleCheckBoxesSelect("investment_category", all.investment_category, category.id)}
                        color="black"
                      />
                    )}
                    label={(
                      <span>
                        {category.label}
                      </span>
                    )}
                  /></div>
                )
                }
              </Grid>

              <Grid item xs={12}>
                <span style={{ fontSize: '15px', marginTop: '20px', marginBottom: '10px', display: 'block', color: `${formikHook && values.investment_industry.length == 0 ? 'red' : 'black'}` }}>
                  Previous investment Industry? (Please select ALL that apply.) *
                </span>

                {all.investment_industry.map(industry =>
                  <div><FormControlLabel
                    id={industry.id}
                    control={(
                      <Checkbox
                        checked={industry.checked}
                        value={industry.value}
                        onChange={() => handleCheckBoxesSelect("investment_industry", all.investment_industry, industry.id)}
                        color="black"
                      />
                    )}
                    label={(
                      <span>
                        {industry.label}
                      </span>
                    )}
                  /></div>
                )
                }
              </Grid>

              <Grid style={{ paddingRight: '0px' }} item xs={12}>
                {/* <Grid style={{ paddingRight: '0px' }} item xs={12} md={8}> */}
                <span style={{ fontSize: '15px', marginTop: '20px', marginBottom: '10px', display: 'block', color: `${formikHook && values.emerging_technologies.length == 0 ? 'red' : 'black'}` }}>
                  Which emerging technology trend are you most interested in? (Please select ALL that apply.) *
                </span>
              </Grid>

              {/* <Grid item xs={12} md={4}>
                <div style={{ paddingTop: '15px' }}>
                  <StarRatings
                    rating={query.emerging_technologies - 1}
                    starRatedColor="orange"
                    changeRating={handleRatings}
                    numberOfStars={5}
                    name='emerging_technologies'
                    starDimension={"25px"}
                  />
                </div>
              </Grid> */}

              <Grid item xs={12}>
                {all.emerging_technologies.map(technology =>
                  <div><FormControlLabel
                    id={technology.id}
                    control={(
                      <Checkbox
                        checked={technology.checked}
                        value={technology.value}
                        onChange={() => handleCheckBoxesSelect("emerging_technologies", all.emerging_technologies, technology.id)}
                        color="black"
                      />
                    )}
                    label={(
                      <span>
                        {technology.label}
                      </span>
                    )}
                  /></div>
                )
                }
              </Grid>

              <Grid item xs={12}>
                <span style={{ fontSize: '15px', marginTop: '20px', marginBottom: '10px', display: 'block', color: `${formikHook && values.previous_emerging_technologies.length == 0 ? 'red' : 'black'}` }}>
                  Have you previously invested in the following emerging technologies? (Please select ALL that apply)*
                </span>

                {all.previous_emerging_technologies.map(technology =>
                  <div><FormControlLabel
                    id={technology.id}
                    control={(
                      <Checkbox
                        checked={technology.checked}
                        value={technology.value}
                        onChange={() => handleCheckBoxesSelect("previous_emerging_technologies", all.previous_emerging_technologies, technology.id)}
                        color="black"
                      />
                    )}
                    label={(
                      <span>
                        {technology.label}
                      </span>
                    )}
                  /></div>
                )
                }
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  className={classes.input}
                  label={"What type of founders are you looking for?"}
                  onChange={handleChange('founder_type')}
                  name="founder_type"
                  value={values.founder_type}
                />
              </Grid>
              <Grid item xs={12}>
                <TextValidator
                  className={classes.input}
                  label={"Where did you hear about us?"}
                  onChange={handleChange('about_us')}
                  name="about_us"
                  value={values.about_us}
                />
              </Grid>
            </Grid>
            <div style={{ marginTop: '50px' }} className={classes.btnArea}>
              <Button disabled={loading} style={{ margin: 'auto' }} variant="outlined" type="submit" color="primary" size="large">
                Suggest Startups
              </Button>
            </div>
          </ValidatorForm>
        </div>
      </Container>
    </div >
  );
}

Contact.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['common'])(Contact);
