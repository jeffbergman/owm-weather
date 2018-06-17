import React from 'react';
import { connect } from 'react-redux';

const ErrorMsg = (props) => {
	//just displays an error message if one exists

	//and here's another comment to test with git
	
	if (!props.errMsg) return null;

  return (
    <div className="error">{props.errMsg}</div>
  );
}

const mapStateToProps = (state) => {
	return {
  	errMsg: state.error
  };
};

export default connect(mapStateToProps)(ErrorMsg);