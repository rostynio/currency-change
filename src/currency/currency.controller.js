import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Actions from '../actions';

import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import CanvasJSReact from '../canvasjs/canvasjs.react';
import "./style.css"

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Currency extends Component {
    state = {
        amount: 20,
        currency: '',
        secondAmount: 20,
        secondCurrency: "",
        swap: false
    }
    constructor() {
        super();
        this.convertCurrency = this.convertCurrency.bind(this);
    }
    componentDidMount() {
        this.props.getCurrency();
    }
    enterAmount = event => {
        const { value } = event.target;
        this.setState(() => {
            return { amount: value };
        })
        setTimeout(() => { this.convertCurrency() });
    }
    enterSecondAmount(val) {
        this.setState({ secondCurrency: val })
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
        setTimeout(() => { this.convertCurrency() });
    };
    convertCurrency() {
        let result = ((this.state.amount) /
            ((this.state.swap) ? this.state.secondCurrency : this.state.currency) *
            ((this.state.swap) ? this.state.currency : this.state.secondCurrency)).toFixed(3);
        this.setState({ secondAmount: result });
    }
    isEmpty = (obj) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    getArrayChart = (array) => {
        let newArray = [];
        (!this.isEmpty(array)) && Object.keys(array).sort().map((key, i) => {
            newArray.push({ label: key, y: array[key] });
        })
        return newArray;
    }
    render() {
        const options = {
            title: {
                text: "Currency Value"
            },
            data: [
                {
                    type: "column",
                    dataPoints: (!this.isEmpty(this.props.currencyList.rates)) && this.getArrayChart(this.props.currencyList.rates)
                }
            ]
        }
        return (
            <div className="wrapper">
                <div className="wrapper-inputs">
                    <TextField
                        id="standard-name"
                        label="Amount"
                        value={this.state.amount}
                        onChange={(event) => this.enterAmount(event)}
                        margin="normal"
                    />
                    <FormControl>
                        <InputLabel htmlFor="age-simple"></InputLabel>
                        <Select
                            value={(this.state.swap) ? this.state.secondCurrency : this.state.currency}
                            onChange={(event) => this.handleChange(event)}
                            inputProps={{
                                name: 'currency',
                                id: 'age-simple',
                            }}
                        >
                            {
                                (!this.isEmpty(this.props.currencyList.rates)) && Object.keys(this.props.currencyList.rates).sort().map((key, i) => {
                                    return (
                                        <MenuItem key={i} value={this.props.currencyList.rates[key]}>{key}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <Button variant="contained" onClick={() => { this.setState({ swap: !this.state.swap }); setTimeout(() => { this.convertCurrency() }) }}>
                        SWAP
                </Button>
                    <FormControl>
                        <InputLabel htmlFor="age-simple"></InputLabel>
                        <Select
                            value={(this.state.swap) ? this.state.currency : this.state.secondCurrency}
                            onChange={(event) => this.handleChange(event)}
                            inputProps={{
                                name: 'secondCurrency',
                                id: 'age-simple',
                            }}
                        >
                            {
                                (!this.isEmpty(this.props.currencyList.rates)) && Object.keys(this.props.currencyList.rates).sort().map((key, i) => {
                                    return (
                                        <MenuItem key={i} value={this.props.currencyList.rates[key]}>{key}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <TextField
                        id="standard-name"
                        label="Amount"
                        value={this.state.secondAmount}
                        margin="normal"
                    />
                </div>
                <div className="chart">
                    <CanvasJSChart options={options} />
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        currencyList: state.getCurrency.currencyData,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Currency);