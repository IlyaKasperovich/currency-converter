import React, { Component } from "react";

export default class Rate extends Component {
  render() {
    return (
      <div className="rate-container">
        <div className="rate-header">Exchange rates</div>
        <div className="rate-value">USD {this.props.usd}</div>
        <div className="rate-value">EUR {this.props.eur}</div>
        <div className="rate-value">RUB {this.props.rub}</div>
      </div>
    );
  }
}
