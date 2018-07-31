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
    disabled: false,
    request: []
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
        <div className="searchWindow">
          <div className="input-group mb-3">
            <input
              className="form-control"
              name="name"
              ref={el => (this.input = el)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-success"
                onClick={() => {
                  this.getData(this.input.value);
                }}
                >
                  Search
                </button>
            </div>
          </div>
          <div className="searchResult">
            <table className="table">
            <tbody>
              {this.state.request.map((product, key) => (
                <tr key={key}>
                  <td>
                    <label>
                      {product.item_name}
                    </label>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => {
                        product.item_name && handleClick(product.item_name, key);
                        this.input.value = "";
                      }}
                    >
                      Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
          </div>
          <hr/>
          <div className="productList">
            {data.map((i, key) => (
              <table className="table">
              <tbody>
                <tr key={key}>
                  <td>
                    <Checkbox
                      type="checkbox"
                      disabled={this.state.disabled}
                    />
                  </td>
                  <td>
                    <label>
                      {i.value}
                    </label>
                  </td>
                  <td>
                    <label>
                      {this.state.request.map((product, key) => (
                        i.key == key && product.nf_calories
                      ))}
                    </label>
                  </td>
                  <td>
                    <label>
                      {this.state.request.map((product, key) => (
                        i.key == key && product.nf_protein
                      ))}
                    </label>
                  </td>
                  <td>
                    <label>
                      {this.state.request.map((product, key) => (
                        i.key == key && product.nf_total_fat
                      ))}
                    </label>
                  </td>
                  <td>
                    <label>
                      {this.state.request.map((product, key) => (
                        i.key == key && product.nf_total_carbohydrate
                      ))}
                    </label>
                  </td>
                  <td>
                    <button className="btn btn-success" onClick={() => {
                      if(this.state.editId !== i.date) {
                        onDelete(key);
                        this.setState({editId: null});
                      }
                    }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
              </table>
            ))}
          </div>
          <div>
          atatata
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
