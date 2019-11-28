import React from 'react';
import { Paper, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faIdCard, faQuestion, faLock, faChevronDown, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

import * as firebaseUtil from 'util/firebase';
import './styles.sass';
import sampleHomePage from 'assets/sample_home_page.png';

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserSignedIn: false,
      info: [
        {
          "icon": faIdCard,
          "title": "what",
          "content": "An application which securely stores your identity documents for retrieval at any place and any time.",
        },
        {
          "icon": faQuestion,
          "title": "why",
          "content": "Originally intended to serve America’s homeless population, Secure&Sure provides a secure online storage platform for those who lack a reliable physical space to keep their important documents.",
        },
        {
          "icon": faLock,
          "title": "how",
          "content": "Our use of RSA in conjunction with Tony Tan™ ensures protection from identity theft and enables our users to store their documents on the cloud for easy access without the fear of fraud or identity theft.",
        }
      ]
    }
  }

  componentDidMount() {
    firebaseUtil.onUserChange(user => this.setState({ isUserSignedIn: !!user }));
  }

  render() {
    return (
      <div className="landing-page">
        <div className="header">
          <div className="menu">
            <div className="logo"><FontAwesomeIcon className="icon" icon={faShieldAlt}/> Logo Placeholder</div>
            <div className="spacer"/>
            {/* <div className="scroll-link">What it is</div>
            <div className="scroll-link">Who it's for</div>
            <div className="scroll-link">How it works</div> */}
            <Link to={this.state.isUserSignedIn ? '/home' : '/login'} className="login-link">
              <Button variant="contained" className="button">
                {this.state.isUserSignedIn ? "Go to Profile" : "Sign In" }
                &nbsp;&nbsp;
                <FontAwesomeIcon icon={faSignInAlt}/>
              </Button>
            </Link>
            
          </div>

          <div className="container">

            <div className="left">
              <div className="title">Secure & Sure</div>
              <div className="description">Brought to you by Bottom Text</div>
            </div>
            <div className="right">
              <img className="preview-image" src={sampleHomePage}/>
              {/*
              <div className="info-cards">
                {
                  this.state.info.map(data => (
                    <Paper className="card" elevation="4" key={data.title}>
                      <div className="card-title">{data.title}</div>
                      <div className="card-content">{data.content}</div>
                    </Paper>
                  ))
                }
              </div>
              */}
            </div> 
          </div>

          <div className="details-button" onClick={() => window.scroll({left: 0, top: window.innerHeight, behavior: 'smooth'})}>
            <div className="text">Details</div>
            <FontAwesomeIcon icon={faChevronDown}/>
          </div>
        </div>

        <div className="info-section">
          {
            this.state.info.map(({ icon, title, content }) => (
              <div className="info" key={title}>
                <FontAwesomeIcon className="icon" icon={icon}/>
                <div className="title">{title}</div>
                <div className="content">{content}</div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}