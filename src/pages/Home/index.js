import React from "react";
import DocumentView from "components/DocumentView"
import "./style.sass"
export default class Home extends React.Component {
  render() {
    return (
    <div className="dView"><DocumentView/></div>
    );
  }
}