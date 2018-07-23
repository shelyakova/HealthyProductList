import React, { Component } from 'react';
import './App.css';
import logo from './images/logo.png';
import { connect } from "react-redux";
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';
import axios from "axios";

class App extends Component {
  state = {
    editId: null,
    editValue: null,
    editDate: null,
    disabled: false,
    chicken: []
  };

  componentDidMount() {
    axios.get('https://api.nutritionix.com/v1_1/search/chicken?fields=item_name,nf_calories,nf_protein,nf_total_fat,nf_total_carbohydrate&appId=512c26a2&appKey=31d88d7dc9513810423da0ee1c4b96a8')
    .then(res => {
      const chicken = res.data;
      this.setState({chicken: chicken});
    })
  }


  render() {
    const { data,
      handleClick = () => {},
      onDelete = () => {},
      onEdit = () => {},
      onClick = () => {
        this.setState
      }
    } = this.props;
    return (
      <div className="App">
      {console.log(this.state.chicken)}
        <div className="appHeader">
          <img src={logo} className="appLogo" />
        </div>
      <div className="container">
        <div className="contentAlign">
          <div className="addProductInput">
            <input name="name" ref={el => (this.input = el)} />
            <button
              onClick={() => {
                this.input.value && handleClick(this.input.value);
                this.input.value = "";
              }}
              >
              Add
            </button>
          </div>
          <div className="productList">
            {data.map((i, key) => (
              <div className="listItem" key={key}>
                <label>
                  <Checkbox
                    type="checkbox"
                    disabled={this.state.disabled}
                  />
                    {i.value}
                </label>
                <button className="buttonDelete" onClick={() => {
                  if(this.state.editId !== i.date) {
                    onDelete(key);
                    this.setState({editId: null});
                  }
                }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default connect(
  state => ({
    data: state
  }),
  dispatch => ({
    handleClick: value =>
      dispatch({
        type: "ADD_TRACK",
        payload: {
          date: new Date().valueOf(),
          value: value
        }
      }),
    onDelete: idx =>
      dispatch({
        type: "DELETE_TRACK",
        payload: idx
      })
  })
)(App);
