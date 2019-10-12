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
          "title": "Lorem",
          "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id iaculis quam. Ut luctus ante eu nisi semper laoreet. Sed vel posuere lorem. Vivamus at nisi elit. Sed sit amet lectus rhoncus, elementum dolor lobortis, hendrerit ex. Vestibulum in lectus at ex viverra pharetra.",
        },
        {
          "title": "Ipsum",
          "content": "Sed sed euismod purus. Duis gravida erat tempus ex efficitur ultrices id vitae est. In hac habitasse platea dictumst. Sed fringilla, lacus nec vestibulum consequat, erat enim pellentesque lectus, a efficitur libero augue a orci. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
        },
        {
          "title": "Dolor",
          "content": "Phasellus maximus augue sed augue ornare laoreet. Sed volutpat, diam a sodales lobortis, quam lectus maximus neque, a efficitur elit neque vel est. Sed sed ultrices tortor. Curabitur elit mauris, blandit non elementum vitae, semper eu velit. Ut luctus dui eget arcu vulputate pulvinar sit amet ac risus.",
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
              <div className="description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse id iaculis quam. Ut luctus ante eu nisi semper laoreet. Sed vel posuere lorem.</div>
            </div>
            <div className="right">
              <div className="placeholder">Some Graphic Placeholder</div>
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