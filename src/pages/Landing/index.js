import React from 'react';
import './styles.sass';
import { Paper, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export default class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [
        {
          "title": "What",
          "content": "An application which securely stores your identity documents for retrieval at any place and any time.",
        },
        {
          "title": "Why",
          "content": "Originally intended to serve America’s homeless population, Secure&Sure provides a secure online storage platform for those who lack a reliable physical space to keep their important documents.",
        },
        {
          "title": "How",
          "content": "Our use of RSA in conjunction with Tony Tan™ ensures protection from identity theft and enables our users to store their documents on the cloud for easy access without the fear of fraud or identity theft.",
        }
      ]
    }
  }

  render() {
    return (
      <div className="landing-page">
        <div className="header">
          <div className="menu">
            <div className="logo"><FontAwesomeIcon className="icon" icon={faShieldAlt}/> Logo Placeholder</div>
            <div className="spacer"/>
            <div className="scroll-link">What it is</div>
            <div className="scroll-link">Who it's for</div>
            <div className="scroll-link">How it works</div>
            <Link to="/login" className="login-link">
              <Button variant="contained" className="button">Login/Sign Up</Button>
            </Link>
            
          </div>

          <div className="container">
            <div className="left">
              <div className="title">Secure & Sure</div>
              <div className="description">Brought to you by Bottom Text</div>
            </div>
            <div className="right">
              {/* <div className="placeholder">Some Graphic Placeholder</div> */}
              <div className="info-cards">
                {
                  this.state.info.map(data => (
                    <Paper className="card" elevation="4">
                      <div className="card-title">{data.title}</div>
                      <div className="card-content">{data.content}</div>
                    </Paper>
                  ))
                }
              </div>
            </div>
          </div>
        </div>

        
        
        {/* <div className="info-cards">
          {
            this.state.infoCardData.map(data => (
              <Paper className="card" elevation="4">
                <div className="card-title">{data.title}</div>
                <div className="card-content">{data.content}</div>
              </Paper>
            ))
          }
        </div> */}
        {/* <div>Login/Signup</div> */}
      </div>
    )
  }
}