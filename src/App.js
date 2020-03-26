import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bynInput: "",

      usdInput: "",
      usdCur: 0,

      eurInput: "",
      eurCur: 0,

      rubInput: "",
      rubCur: 0
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
          bynInput: value + "",
          usdInput: bynValue / this.state.usdCur + "",
          eurInput: bynValue / this.state.eurCur + "",
          rubInput: bynValue / this.state.rubCur + ""
        });
        break;
      case "usd":
        bynValue = value * this.state.usdCur;
        this.setState({
          bynInput: bynValue + "",
          usdInput: value + "",
          eurInput: bynValue / this.state.eurCur + "",
          rubInput: bynValue / this.state.rubCur + ""
        });
        break;
      case "eur":
        bynValue = value * this.state.eurCur;
        this.setState({
          bynInput: bynValue + "",
          usdInput: bynValue / this.state.usdCur + "",
          eurInput: value + "",
          rubInput: bynValue / this.state.rubCur + ""
        });
        break;
      case "rub":
        bynValue = value * this.state.rubCur;
        this.setState({
          bynInput: bynValue + "",
          usdInput: bynValue / this.state.usdCur + "",
          eurInput: bynValue / this.state.eurCur + "",
          rubInput: value + ""
        });
        break;
    }
  }

  handleChange(event) {
    let currentTarget = event.target.className;
    let value = event.target.value;

    this.tryConvert(currentTarget, +value);
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
    return (
      <div>
        <h1>Currency converter</h1>
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
      </div>
    );
  }
}

export default App;
