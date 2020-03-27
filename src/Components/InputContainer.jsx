import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

export default class InputContainer extends Component {
  render() {
    return (
      <Container maxWidth="sm">
        <div className="container-input">
          <TextField
            className="standard-basic"
            label="BYN"
            id="byn"
            value={this.props.bynInput}
            onChange={this.props.func}
          />
        </div>
        <div className="container-input">
          <TextField
            className="standard-basic"
            label="USD"
            id="usd"
            value={this.props.usdInput}
            onChange={this.props.func}
          />
        </div>
        <div className="container-input">
          <TextField
            className="standard-basic"
            label="EUR"
            id="eur"
            value={this.props.eurInput}
            onChange={this.props.func}
          />
        </div>
        <div className="container-input">
          <TextField
            className="standard-basic"
            label="RUB"
            id="rub"
            value={this.props.rubInput}
            onChange={this.props.func}
          />
        </div>
      </Container>
    );
  }
}
