import React, { Component } from "react";
import CardsGrid from "../CardsGrid/CardsGrid";
import Header from "../Header/Header";

class Home extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div>
        <h1>home</h1>
        <Header />
        <CardsGrid />
      </div>
    );
  }
}

export default Home;
