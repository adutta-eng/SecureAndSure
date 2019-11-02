import React from "react";
import DocumentView from "components/DocumentView"
import "./style.sass"
import { TextField } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import * as firebase from "util/firebase";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      searchText: '',
    }
  }

  componentDidMount() {
    firebase.onUserChange(user => {
      if (user) {
        firebase.onAddDocument(documents => {
          this.setState({documents: Object.values(documents)});
        });
      }
    });
  }

  filteredDocuments() {
    const stringContains = (str, substr) => str.toLowerCase().includes(substr.toLowerCase());
    return this.state.documents.filter(document => stringContains(JSON.stringify(document), this.state.searchText));
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
        onChange={e => this.setState({searchText: e.target.value})}
      />

      <DocumentView documents={this.filteredDocuments()}/>
    </div>
    );
  }
}