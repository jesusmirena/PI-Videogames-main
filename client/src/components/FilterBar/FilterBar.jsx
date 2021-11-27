import React, { Component } from "react";
import { connect } from "react-redux";

export class FilterBar extends Component {
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
          </select>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);
