import React from 'react';
import { connect } from 'react-redux';
import Search from './Search';

const Header = (props) => {
  //this displays the title or city on the left
  //and a search component on the right
  return (
    <div className="header">
      <div className="header__left">
        {props.title}
      </div>
      <div className="header__right">
        <Search />  
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const title = state.weather.location ? state.weather.location.name : 'Weather';
  return {
    title
  }
};

export default connect(mapStateToProps)(Header);