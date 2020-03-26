import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bynInput: "",

      usdInput: "",
      usdCur: "",

      eurInput: "",
      eurCur: "",

      rubInput: "",
      rubCur: "",

      errorMessage: ""
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  tryConvert(cur, value) {
    let bynValue;
    switch (cur) {
      case "byn":
        bynValue = value;
        this.setState({
          bynInput: value,
          usdInput: Math.round((bynValue / this.state.usdCur) * 100) / 100,
          eurInput: Math.round((bynValue / this.state.eurCur) * 100) / 100,
          rubInput: Math.round((bynValue / this.state.rubCur) * 100) / 100,
          errorMessage: ""
        });
        break;
      case "usd":
        bynValue = value * this.state.usdCur;
        this.setState({
          bynInput: Math.round(bynValue * 100) / 100,
          usdInput: value,
          eurInput: Math.round((bynValue / this.state.eurCur) * 100) / 100,
          rubInput: Math.round((bynValue / this.state.rubCur) * 100) / 100,
          errorMessage: ""
        });
        break;
      case "eur":
        bynValue = value * this.state.eurCur;
        this.setState({
          bynInput: Math.round(bynValue * 100) / 100,
          usdInput: Math.round((bynValue / this.state.usdCur) * 100) / 100,
          eurInput: value,
          rubInput: Math.round((bynValue / this.state.rubCur) * 100) / 100,
          errorMessage: ""
        });
        break;
      case "rub":
        bynValue = value * this.state.rubCur;
        this.setState({
          bynInput: Math.round(bynValue * 100) / 100,
          usdInput: Math.round((bynValue / this.state.usdCur) * 100) / 100,
          eurInput: Math.round((bynValue / this.state.eurCur) * 100) / 100,
          rubInput: value,
          errorMessage: ""
        });
        break;
    }
  }

  handleChange(event) {
    let currentTarget = event.target.className;
    let value = event.target.value;

    if (isNaN(+value)) {
      this.setState({
        bynInput: "0",
        usdInput: "0",
        eurInput: "0",
        rubInput: "0",
        errorMessage: "Intered incorrect value"
      });
    } else {
      this.tryConvert(currentTarget, +value);
    }
  }

  fetchData() {
    const url = "https://www.nbrb.by/API/ExRates/Rates?Periodicity=0";

    let usd, eur, rub;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        let curUsd = +data[4].Cur_OfficialRate / +data[4].Cur_Scale;
        let curEur = +data[5].Cur_OfficialRate / +data[5].Cur_Scale;
        let curRub = +data[16].Cur_OfficialRate / +data[16].Cur_Scale;
        usd = Math.round(curUsd * 100) / 100;
        eur = Math.round(curEur * 100) / 100;
        rub = Math.round(curRub * 100) / 100;
        this.setState({
          usdCur: +usd,
          eurCur: +eur,
          rubCur: +rub
        });
      });
  }

  render() {
    let container;

    if (this.state.usdCur) {
      container = (
        <div>
          <input
            className="byn"
            value={this.state.bynInput}
            onChange={this.handleChange.bind(this)}
          ></input>
          <input
            className="usd"
            value={this.state.usdInput}
            onChange={this.handleChange.bind(this)}
          ></input>
          <input
            className="eur"
            value={this.state.eurInput}
            onChange={this.handleChange.bind(this)}
          ></input>
          <input
            className="rub"
            value={this.state.rubInput}
            onChange={this.handleChange.bind(this)}
          ></input>
        </div>
      );
    } else {
      container = <div>Loading</div>;
    }

    return (
      <div>
        <h1>Currency converter</h1>
        {container}
        <div>{this.state.errorMessage}</div>
      </div>
    );
  }
}

export default App;
