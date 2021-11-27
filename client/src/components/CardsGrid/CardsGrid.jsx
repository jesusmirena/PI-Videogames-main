import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "../Card/Card";

class CardsGrid extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <h1>CardsGrid</h1>
        {this.props.allVideogames?.map((game) => {
          return <Card id={game.id} name={game.name} img={game.img} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allVideogames: state.videogames.allVideogames,
});

export default connect(mapStateToProps, null)(CardsGrid);
