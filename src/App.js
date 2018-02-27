import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { fetch } from './actions/fetch.js';
import { compose, path } from  'ramda';

class App extends Component {

  render() {
    const id = path(['data', 'ID'], this.props.data);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Status: {this.props.status}</h1>
        </header>
        <div className="App-intro">
          <p>
            Using <b>observable</b> will cancel all previous pending requests. With <b>isomorphic</b> fetch all previous pending requests remain active, but will be ignored when response arrived.
          </p>

          <button onClick={() => this.props.fetch('http://www.fakeresponse.com/api/', true)}>fetch with observable</button>
          <button onClick={() => this.props.fetch('http://www.fakeresponse.com/api/', false)}>fetch with isomorphic fetch</button>
          <div>
            {id && <b>Response data: ID: {id}</b>}
          </div>
        </div>
      </div>
    );
  }

}

export default compose(
  connect(state => ({
    data: path(['fetch', 'data'], state),
    status: path(['fetch', 'status'], state)
  }), { fetch }),
)(App);
