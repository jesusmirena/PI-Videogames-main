import React, { Component } from "react";
import CardsGrid from "../CardsGrid/CardsGrid";
import Header from "../Header/Header";
import FilterBar from "../FilterBar/FilterBar";

class Home extends Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div>
        <h1>home</h1>
        <Header />
        <FilterBar />
        <CardsGrid />
      </div>
    );
  }
}

export default Home;
