import React from "react";
import { TextField, Button } from '@material-ui/core';

import './styles.sass';

export default class Login extends React.Component {
  render() {
    return (
      <div className="login-page">
        <div className="container">
          <div className="login-form">
            <div className="title">Login</div>
            <TextField className="input" label="Email Address" fullWidth={true}/>
            <TextField className="input" label="Password" type="password" fullWidth={true}/>
            <div className="spacer"/>
            <Button className="button" color="primary" variant="contained">Login</Button>
          </div>

          <div className="separator"/>

          <div className="signup-form">
            <div className="title">Sign Up</div>
            <TextField className="input" label="Email Address" fullWidth={true}/>
            <TextField className="input" label="Password" type="password" fullWidth={true}/>
            <TextField className="input" label="Repeat Password" type="password" fullWidth={true}/>
            <div className="spacer"/>
            <Button className="button" color="primary" variant="contained">Sign Up</Button>
          </div>
        </div>
      </div>
    );
  }
}