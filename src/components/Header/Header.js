import React, { Component } from 'react';
import './Header.css';
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      sortByLastWord: false,
      displayFavorites: false,
    };
  }

  toggleSort = () => {
    this.setState({
      sortByLastWord: !this.state.sortByLastWord,
    }, () => {
      this.props.sortCats(this.state.sortByLastWord);
    });
  }

  goToHomeList = () => {
    this.setState({
      displayFavorites: false,
    }, () => {
      this.props.handleTitleClick();
    });
  }

  toggleFavorites = () => {
    this.setState({
      displayFavorites: !this.state.displayFavorites,
      sortByLastWord: false,
    }, () => {
      this.props.toggleFavorites(this.state.displayFavorites);
    });
  }

  render() {
    return (
      <div className='header'>
        <div className='header-title' onClick={this.goToHomeList}>Cats! Cats! Cats!</div>
        <div className='header-icons'>
          <FontAwesomeIcon size='lg' className='padding-right-1x' color='pink' icon={this.state.displayFavorites ? ['fas', 'heart'] : ['far', 'heart']} onClick={this.toggleFavorites}/>
          <FontAwesomeIcon size='lg' className={this.state.sortByLastWord ? 'active' : ''} onClick={this.toggleSort} icon='sort' />
        </div>
      </div>
    )
  }
}

export default Header;