import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames } from "../../redux/actions";

class NavHeader extends Component {
  getAllVideogames = () => {
    this.props.getVideogames();
  };
  componentDidMount() {
    this.getAllVideogames();
  }
  render() {
    return (
      <div>
        <Link to="/Createvideogame">Create your own videogame</Link>
        <button onClick={this.getAllVideogames}>
          Reload all the videogames
        </button>
      </div>
    );
  }
}
const mapDispatchToProps = {
  getVideogames,
};
export default connect(null, mapDispatchToProps)(NavHeader);
