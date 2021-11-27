import React, { Component } from "react";
import { connect } from "react-redux";
import { getGenres, getPlatforms } from "../../redux/actions";

export class FilterBar extends Component {
  getGenresAndPlatforms = () => {
    this.props.getGenres();
    this.props.getPlatforms();
  };
  componentDidMount() {
    this.getGenresAndPlatforms();
  }

  render() {
    return (
      <div>
        <nav>
          <select>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
            {/* <option value="">Asc</option> */}
            <option value="highest">Highest rate</option>
            <option value="lowest">Lowest rate</option>
          </select>
          <select name="" id="">
            <option value="">---Genre---</option>
            {this.props.genres?.map((genre) => {
              return <option value={genre.name}>{genre.name}</option>;
            })}
          </select>
          <select name="" id="">
            <option value="">---Platforms---</option>
            {this.props.platforms?.map((platform) => {
              return <option value={platform.name}>{platform.name}</option>;
            })}
          </select>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  genres: state.genres.genres,
  platforms: state.platforms.platforms,
});

const mapDispatchToProps = { getPlatforms, getGenres };

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
