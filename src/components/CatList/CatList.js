import React, { Component } from 'react';
import CatCard from '../CatCard/CatCard';
import BlankState from '../BlankState/BlankState';
import './CatList.css';

class CatList extends Component {
  renderCatCards = () => {
    let catCards = [];
    this.props.catObjects.forEach((catObj) => {
      catCards.push(
        <CatCard
          handleFavoriting={this.props.handleFavoriting}
          key={catObj.id}
          id={catObj.id}
          fact={catObj.fact}
          url={catObj.url}
        />
      )
    });

    if (catCards.length) {
      return (
        <div className='grid-container'>
          {catCards}
        </div>
      )
    } else {
      return(
        <BlankState text="Sorry, we couldn't find any cats"/>
      )
    }
  };
  
  render() {
    return (
      <div>
        {this.renderCatCards()}
      </div>
    )
  }
}

export default CatList;