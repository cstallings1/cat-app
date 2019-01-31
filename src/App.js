import React, { Component } from 'react';
import CatList from './components/CatList/CatList';
import Loading from './components/Loading/Loading';
import Header from './components/Header/Header';
import './App.css';
import utils from './utils';
import { fetchImages, fetchFacts } from './api';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { faHeart as fasFaHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farFaHeart } from '@fortawesome/free-regular-svg-icons';

library.add(faSort, farFaHeart, fasFaHeart);

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      catImages: [],
      catFacts: [],
      catObjectArray: [],
      favorites: [],
      displayFavorites: false,
    }
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    this.initLocalStorage();
    this.getCatData();
  }

  /**
   * Get data from the separate APIs
   * Build our cat objects so we can display images and facts together
   */
  getCatData = () => {
    Promise.all([this.getCatFacts(), this.getCatImages()])
      .then((response) => {
        this.buildCatObjects();
        this.setState({
          isLoading: false,
        });
      });
  }

  /** 
   * Create an empty array of favorites if it doesn't already exist
   */
  initLocalStorage = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    this.updateFavorites(favorites);
  };

  /** 
   * Build cat objects using data returned from both APIs
   */
  buildCatObjects = () => {
    const catObjectArray = this.state.catImages.map((imageObj, index) => {
      // Store the last word for sorting
      const lastWord = utils.getLastWord(this.state.catFacts[index]);

      return {
        id: imageObj.id,
        url: imageObj.url,
        fact: this.state.catFacts[index],
        lastWord,
        key: index,
      };
    });

    this.setState({
      catObjectArray,
    });
  };

  /**
   * Get cat images from api and set state
   */
  async getCatImages() {
    return fetchImages()
      .then((response) => {
        this.setState({
          catImages: response
        });
      });
  }

  /**
   * Get cat facts from API and set state
   */
  async getCatFacts() {
    return fetchFacts()
      .then((response) => {
        const catFactArray = response.data.map((factObj) => factObj.fact);
        this.setState({
          catFacts: catFactArray
        });
      });
  }

  /** 
   * Sort by last word or key
   * We sort by key to return to original sort order
   */
  handleSortCats = (sortByLastWord) => {
    const sortParam = sortByLastWord ? 'lastWord' : 'key';
    const arrayToSort = this.state.displayFavorites ? this.state.favorites : this.state.catObjectArray;
    let sortedCats = arrayToSort.sort(utils.compare(sortParam));
  
    if (this.state.displayFavorites) {
      this.setState({
        favorites: sortedCats,
      });
    } else {
      this.setState({
        catObjectArray: sortedCats,
      });
    }
  }

  handleTitleClick = () => {
    this.setState({
      displayFavorites: false,
    })
  }

  toggleFavorites = (displayFavorites) => {
    this.setState({
      displayFavorites,
    });
  }

  updateFavorites = (favorites) => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    this.setState({
      favorites,
    });
  }

  /** 
   * Add or remove a favorite from local strorage and update state
   */
  handleToggleFavorite = (cardObject, e) => {
    e.stopPropagation();
  
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    if (!utils.isFavorite(cardObject.id)) {
      const lastWord = utils.getLastWord(cardObject.fact);

      favorites.push({
        id: cardObject.id,
        url: cardObject.url,
        fact: cardObject.fact,
        lastWord,
        key: favorites.length + 1,
      });
    } else {
      const index = utils.getFavoriteIndex(favorites, cardObject.id);
      if (index > -1) {
        favorites.splice(index, 1);
      }
    }; 
    
    this.updateFavorites(favorites);
  }


  render() {
    const { 
      isLoading,
      favorites, 
      catObjectArray, 
      displayFavorites 
    } = this.state;

    if (isLoading) return <Loading></Loading>;
    
    return (
      <div className="app">
        <Header
          handleTitleClick={this.handleTitleClick}
          sortCats={this.handleSortCats}
          toggleFavorites={this.toggleFavorites}>
        </Header>
        <CatList
          cats={displayFavorites ? favorites : catObjectArray}
          handleToggleFavorite={this.handleToggleFavorite}
          />
      </div>
    );
  }
}

export default App;
