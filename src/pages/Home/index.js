import React from "react";
import DocumentView from "components/DocumentView"
import "./style.sass"
import { TextField } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import birthCertificateActual from "assets/birthCertificateActual.jpg"
import actualFemaleLicense from "assets/actualFemaleLicense.jpg"
import realPassport2 from "assets/realPassport2.png"
import legitSocial from "assets/legitSocial.jpg"
import marriageCertificate from "assets/marriageCertificate.jpg"
const documents = [
  {
    type: "Driver's License",
    img: actualFemaleLicense,
    parsedInfo: [
      { FIRST_NAME: "JANE Q" },
      { LAST_NAME: "PUBLIC"},
      { LICENSE_NO: "P142-4558-7924"},
      { ADDRESS: "1234 MAIN STREET\nSPRINGFIELD, IL 62723"},
      { DOB: "11/14/1987"},
      { EXP: "11/14/2020" },
      { ISS: "05/01/2016" },
      { CLASS: "D"},
      { END: "NONE"},
      { REST: "NONE"},
      { SEX: "F"},
      { WEIGHT: "145 lbs"},
      { HEIGHT: "5'-6"},
      { EYES: "BRN"},
      { TYPE: "ORG"},
      { DD: "20160210993DT0328"}
    ],
  },
  {
    type: "Birth Certificate",
    img: birthCertificateActual,
    parsedInfo: [
      { NAME: "JANE Q PUBLIC" },
      { SEX: "FEMALE" },
      { DOB: "SEPTEMBER 14, 1990" }
    ]
  },
  {
    type: "Passport",
    img: realPassport2,
    parsedInfo: [
      { TYPE: "P"},
      { CODE: "USA"},
      { PASSPORT_NO: "451213660"},
      { SURNAME: "HASTINGS" },
      { GIVEN_NAME: "THOMAS"},
      { NATIONALITY: "UNITED STATES OF AMERICA"},
      { DOB: "9 FEB 1978" },
      { PLACE_OF_BIRTH: "CALIFORNIA, USA"},
      { SEX: "M" },
      { DATE_OF_ISSUE: "12 JUN 2012"},
      { DATE_OF_EXPIRATION: "12 JUN 2022"}
    ]
  },
  {
    type: "Social Security Card",
    img: legitSocial,
    parsedInfo: [
      { NAME: "AUGUST NAPOLEON ANDERSON" },
      { ACCOUNT_NUMBER: "017-10-1312" },
      { DATE_OF_ISSUE: "12-7-36" }
    ]
  },
  {
    type: "Marriage Certificate",
    img: marriageCertificate,
    parsedInfo: [
      { LICENSE_NO: "2398487-0" },
      { GROOM_NAME: "HYMAN\tVICTOR" },
      { GROOM_AGE: "73"},
      { BRIDE_NAME: "ANNA\tRUBIN"},
      { GROOM_AGE: "63"},
      { DATE_OF_MARRIAGE: "MAY 24, 1956"}
    ]
  }
];

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredDocuments: documents,
    }
  }

  handleSearch(searchText) {
    const stringContains = (str, substr) => str.toLowerCase().includes(substr.toLowerCase());
    const filteredDocuments = documents.filter(document => stringContains(JSON.stringify(document), searchText));
    this.setState({ filteredDocuments });
  }

  render() {
    return (
    <div className="home-page">
      <TextField
        label={<FontAwesomeIcon icon={faSearch}/>}
        type="search"
        className="search-field"
        margin="normal"
        variant="outlined"
        onChange={e => this.handleSearch(e.target.value)}
      />

      <DocumentView documents={this.state.filteredDocuments}/>
    </div>
    );
  }
}