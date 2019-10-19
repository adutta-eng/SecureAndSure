import React from "react";
import DocumentView from "components/DocumentView"
import "./style.sass"
import { TextField } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import birthCertificateActual from "assets/birthCertificateActual.jpg"
import actualFemaleLicense from "assets/actualFemaleLicense.jpg"

const documents = [
  {
    type: "Driver's License",
    img: actualFemaleLicense,
    parsedInfo: [
      { NAME: "JANE Q" },
      { ISS: "05/01/2016" },
      { EXP: "11/14/2020" },
    ],
  },
  {
    type: "Birth Certificate",
    img: birthCertificateActual,
    parsedInfo: [
      { NAME: "EXAMPLE" },
      { SEX: "FEMALE" },
      { DOB: "SEPTEMBER 14, 1990" }
    ]
  },
  {
    type: "Passport",
    parsedInfo: [
      { NAME: "EXAMPLE" },
      { SEX: "FEMALE" },
      { DOB: "SEPTEMBER 14, 1990" }
    ]
  },
  {
    type: "Social Security Card",
    parsedInfo: [
      { NAME: "EXAMPLE" },
      { SEX: "FEMALE" },
      { DOB: "SEPTEMBER 14, 1990" }
    ]
  },
  {
    type: "driverMale",
    parsedInfo: [
      { NAME: "EXAMPLE" },
      { SEX: "FEMALE" },
      { DOB: "SEPTEMBER 14, 1990" }
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