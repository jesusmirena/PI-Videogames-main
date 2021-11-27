import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Card extends Component {
  render() {
    return (
      <div key={this.props.id}>
        <Link to={`/videogame/${this.props.id}`}>
          <h3>{this.props.name}</h3>
          <img
            style={{ maxWidth: "250px" }}
            src={
              this.props.img ||
              "https://m.media-amazon.com/images/I/611fcGzpVUL.jpg"
            }
          />
        </Link>
      </div>
    );
  }
}
