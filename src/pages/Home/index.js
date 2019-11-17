import React from "react";
import DocumentView from "components/DocumentView"
import "./style.sass"
import { TextField, Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from 'react-router-dom';
import { decryptInfo } from 'util/encryption'
import * as firebaseUtil from "util/firebase";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      searchText: '',
    }
  }

  componentDidMount() {
    firebaseUtil.onUserChange(user => {
      if (user) {
        firebaseUtil.getEncryptedPrivateKey().then(encryptedPrivateKey => {
          firebaseUtil.onAddDocument(documentsObj => {
            if (documentsObj) {
              const encryptedDocuments = Object.values(documentsObj)
              const documents = encryptedDocuments.map(document => decryptInfo(localStorage.hash, encryptedPrivateKey, document))
              this.setState({documents});
            }
          });
        })
      }
    });
  }

  filteredDocuments() {
    const stringContains = (str, substr) => str.toLowerCase().includes(substr.toLowerCase());
    return this.state.documents.filter(document => stringContains(JSON.stringify(document), this.state.searchText));
  }

  signOut() {
    firebaseUtil.signOut().then(() => {
      this.props.history.push('/');
      localStorage.removeItem("hash")
    })
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

      <Button className="logout-button" onClick={() => this.signOut()}>Sign Out</Button>
    </div>
    );
  }
}

export default withRouter(Home)