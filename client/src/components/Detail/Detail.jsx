import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogameDetail } from "../../redux/actions";

export class Detail extends Component {
  constructor(props) {
    super(props);
  }
  idDetail = this.props.match.params?.id;

  getIdDetail = (id) => {
    this.props.getVideogameDetail(id);
  };
  componentDidMount() {
    this.getIdDetail(this.idDetail);
  }
  render() {
    return (
      <div>
        <Link to="/home">Home</Link>
        <h1>detail</h1>
        {this.props.detail ? (
          <div>
            <h2>{this.props.detail.name}</h2>
          </div>
        ) : (
          <h2>Can't find the game</h2>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  detail: state.videogame.videogameDetail,
});

const mapDispatchToProps = {
  getVideogameDetail,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
