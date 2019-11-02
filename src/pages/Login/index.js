import React from "react";
import { TextField, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';

import * as firebaseUtil from "util/firebase";
import './styles.sass';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {
        email: '',
        password: ''
      },
      signup: {
        email: '',
        password: '',
        repeatPassword: ''
      }
    }
  }

  setLoginField(field, value) {
    this.setState({ login: {...this.state.login, [field]: value }})
  }
  

  setSignupField(field, value) {
    this.setState({ signup: {...this.state.signup, [field]: value }})
  }

  login() {
    const { email, password } = this.state.login;
    firebaseUtil.signIn(email, password).then(() => {
      this.props.history.push('/home');
    }).catch(error => {
      // show error message
    });
  }

  signUp() {
    const { email, password, repeatPassword } = this.state.signup
    if (password === repeatPassword) {
      firebaseUtil.signUp(email, password).then(() => {
      this.props.history.push('/home');
      }).catch(error => {
        // display error message
      })
    } else {
      // tell user that passwords don't match
    }
  }

  render() {
    return (
      <div className="login-page">
        <div className="header">
          {/* This icon is temporary (until we have an actual icon) */}
          <FontAwesomeIcon className="icon" icon={faShieldAlt}/>
        </div>

        <div className="container">
          <div className="login-form">
            <div className="title">Login</div>
            <TextField
              className="input"
              label="Email Address"
              fullWidth={true}
              value={this.state.login.email}
              onChange={e => this.setLoginField('email', e.target.value)}/>

            <TextField
              className="input"
              label="Password"
              type="password"
              fullWidth={true}
              value={this.state.login.password}
              onChange={e => this.setLoginField('password', e.target.value)}/>

            <div className="spacer"/>
            <Button
              className="button"
              color="primary"
              variant="contained"
              onClick={() => this.login()}>
                Login
            </Button>
          </div>

          <div className="separator"/>

          <div className="signup-form">
            <div className="title">Sign Up</div>
            <TextField
              className="input"
              label="Email Address"
              fullWidth={true}
              value={this.state.signup.email}
              onChange={e => this.setSignupField('email', e.target.value)}/>

            <TextField
              className="input"
              label="Password"
              type="password"
              fullWidth={true}
              value={this.state.signup.password}
              onChange={e => this.setSignupField('password', e.target.value)}/>

            <TextField
              className="input"
              label="Repeat Password"
              type="password"
              fullWidth={true}
              value={this.state.signup.repeatPassword}
              onChange={e => this.setSignupField('repeatPassword', e.target.value)}/>
            
            <div className="spacer"/>

            <Button
              className="button"
              color="primary"
              variant="contained"
              onClick={() => this.signUp()}>
                Sign Up
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
