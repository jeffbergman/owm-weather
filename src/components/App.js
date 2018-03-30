import React, { Component } from 'react';
import { connect } from 'react-redux';
import Content from './Content';
import Header from './Header';
import LoadingIndicator from './LoadingIndicator';
import ErrorMsg from './ErrorMsg';
import { NIGHT } from '../actions';

class App extends Component {

  render() {

    let className = 'main';
    if (this.props.display === NIGHT) {
      className += ' night';
    }

    return (
      <div className={className}>
        <Header />
        <LoadingIndicator />
        <ErrorMsg />
        <Content />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    display: state.weather.display
  }
};

export default connect(mapStateToProps)(App);
