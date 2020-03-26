import React, { Component } from "react";
import Container from "./Components/InputContainer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bynInput: "",
      usdInput: "",
      eurInput: "",
      rubInput: "",
      errorMessage: "",
      isLoaded: false
    };
    this.usdCur = "";
    this.eurCur = "";
    this.rubCur = "";
  }

  componentDidMount() {
    this.fetchData();
  }

  tryConvert(cur, value) {
    //сделано отдельно для каждой валюты для большей точности данных
    let bynValue;
    switch (cur) {
      case "byn":
        bynValue = value;
        this.setState({
          bynInput: value,
          usdInput: Math.round((bynValue / this.usdCur) * 100) / 100,
          eurInput: Math.round((bynValue / this.eurCur) * 100) / 100,
          rubInput: Math.round((bynValue / this.rubCur) * 100) / 100,
          errorMessage: ""
        });
        break;
      case "usd":
        bynValue = value * this.usdCur;
        this.setState({
          bynInput: Math.round(bynValue * 100) / 100,
          usdInput: value,
          eurInput: Math.round((bynValue / this.eurCur) * 100) / 100,
          rubInput: Math.round((bynValue / this.rubCur) * 100) / 100,
          errorMessage: ""
        });
        break;
      case "eur":
        bynValue = value * this.eurCur;
        this.setState({
          bynInput: Math.round(bynValue * 100) / 100,
          usdInput: Math.round((bynValue / this.usdCur) * 100) / 100,
          eurInput: value,
          rubInput: Math.round((bynValue / this.rubCur) * 100) / 100,
          errorMessage: ""
        });
        break;
      case "rub":
        bynValue = value * this.rubCur;
        this.setState({
          bynInput: Math.round(bynValue * 100) / 100,
          usdInput: Math.round((bynValue / this.usdCur) * 100) / 100,
          eurInput: Math.round((bynValue / this.eurCur) * 100) / 100,
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
        bynInput: "",
        usdInput: "",
        eurInput: "",
        rubInput: "",
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

        this.usdCur = usd;
        this.eurCur = eur;
        this.rubCur = rub;

        this.setState({ isLoaded: true });
      });
  }

  render() {
    let container;

    if (this.state.isLoaded) {
      container = (
        <Container
          bynInput={this.state.bynInput}
          usdInput={this.state.usdInput}
          eurInput={this.state.eurInput}
          rubInput={this.state.rubInput}
          func={this.handleChange.bind(this)}
        />
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
