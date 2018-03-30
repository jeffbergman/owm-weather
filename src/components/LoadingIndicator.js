import React from 'react';
import { connect } from 'react-redux';

const LoadingIndicator = (props) => {
	//this always renders. it displays the loading message
	//while data is being fetched 
	
	const text = props.isLoading ? 'Loading...' : '';

  return (
    <div className="loading">{text}</div>
  );
}

const mapStateToProps = (state) => {
	return {
  	isLoading: state.network
  };
};

export default connect(mapStateToProps)(LoadingIndicator);