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
    request: [],
    product: {
      item_name: '',
      nf_calories: '',
      nf_protein: '',
      nf_total_fat: '',
      nf_total_carbohydrate: ''
    }
  };

getData(request) {
  axios.get('https://api.nutritionix.com/v1_1/search/'
  + request
  + '?fields=item_name,nf_calories,nf_protein,nf_total_fat,nf_total_carbohydrate'
  + '&appId=512c26a2&appKey=31d88d7dc9513810423da0ee1c4b96a8')
  .then(res => {
    var result = [];
    const request = Object.values(res.data)[2].splice(4,5);
    request.map((item, key) => {
      result[Math.round(item.fields.nf_calories)] = item.fields;
    });
    this.setState({request: result});
    console.log(this.state.request);
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
        <div className="appHeader">
          <img src={logo} className="appLogo" />
        </div>
      <div className="container">
        <div className="contentAlign">
          <div className="addProductInput">
            <input name="name" ref={el => (this.input = el)}/>
            <button
              onClick={() => {
                this.getData(this.input.value);
              }}
              >
              Search
            </button>
          </div>
          <div className="searchResult">
            {this.state.request.map((product, key) => (
              <div className="searchItem" key={key}>
                <label>
                  {product.item_name}
                  <button
                    className="addButton"
                    onClick={() => {
                      product.item_name && handleClick(product.item_name, key);
                      this.input.value = "";
                      this.setState({
                        product: {
                            key: key,
                            item_name: product.item_name,
                            nf_calories: product.nf_calories,
                            nf_protein: product.nf_protein,
                            nf_total_fat: product.nf_total_fat,
                            nf_total_carbohydrate: product.nf_total_carbohydrate
                        }
                      });
                    }}
                    >
                    Add
                  </button>
                </label>
              </div>
            ))}
          </div>
          <div className="productList">
            {data.map((i, key) => (
              <div className="listItem" key={key}>
                <label>
                {console.log(this.state.request.item_name)}
                  <Checkbox
                    type="checkbox"
                    disabled={this.state.disabled}
                  />
                    {i.value} |
                    {this.state.request.map((product, key) => (
                       i.key == key && `${product.nf_calories} | ${product.nf_protein} | ${product.nf_total_fat} | ${product.nf_total_carbohydrate}`
                    ))}
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
    handleClick: (value, key) =>
      dispatch({
        type: "ADD_TRACK",
        payload: {
          key: key,
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
