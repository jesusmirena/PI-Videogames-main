import React, { Component } from "react";
import { connect } from "react-redux";

class CardsGrid extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <h1>CardsGrid</h1>
        {this.props.allVideogames?.map((game) => {
          return <h1>{game.name}</h1>;
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allVideogames: state.videogames.allVideogames,
});

export default connect(mapStateToProps, null)(CardsGrid);
