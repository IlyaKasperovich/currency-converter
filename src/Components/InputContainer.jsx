import React, { Component } from "react";

export default class Container extends Component {
  render() {
    return (
      <div>
        <input
          className="byn"
          value={this.props.bynInput}
          onChange={this.props.func}
        ></input>
        <input
          className="usd"
          value={this.props.usdInput}
          onChange={this.props.func}
        ></input>
        <input
          className="eur"
          value={this.props.eurInput}
          onChange={this.props.func}
        ></input>
        <input
          className="rub"
          value={this.props.rubInput}
          onChange={this.props.func}
        ></input>
      </div>
    );
  }
}
