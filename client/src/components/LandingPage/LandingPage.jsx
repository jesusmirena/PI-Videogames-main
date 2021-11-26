import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class LandingPage extends Component {
  render() {
    return (
      <div>
        <h1>Welcome</h1>
        <Link to="/home">
          <button>home</button>
        </Link>
      </div>
    );
  }
}
