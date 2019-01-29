import React, { Component } from 'react';
import CatList from './components/CatList/CatList';
import Loading from './components/Loading/Loading';
import Header from './components/Header/Header';
import './App.css';
import { CORS_PROXY, CAT_API_KEY } from './constants';
import utils from './utils';
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
   * Build cat obj using data returned from both APIs
   */
  buildCatObjects = () => {
    const catObjectArray = this.state.catImages.map((imageObj, index) => {
      // Store the last word for sorting
      const lastWord = utils.getLastWord(this.state.catFacts[index]);

      return {
        id: imageObj.id,
        url: imageObj.url,
        fact: this.state.catFacts[index],
        lastWord
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
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          // Pull out XML parsing
          let parser = new DOMParser();
          let mlDoc = parser.parseFromString(xhr.response, "text/xml");
          const urlNodes = mlDoc.getElementsByTagName('url');
          const idNodes = mlDoc.getElementsByTagName('id');
          const imgObjArray = Array.from(urlNodes).map((node, index) => {
            return {
              url: node.innerHTML,
              id: idNodes[index].innerHTML,
            };
          });

          this.setState({
            catImages: imgObjArray
          });
          resolve();
        }
      }
      xhr.open('GET', `${CORS_PROXY}/http://thecatapi.com/api/images/get?format=xml&results_per_page=25`, true);
      xhr.setRequestHeader('x-api-key', CAT_API_KEY);
      xhr.send('');
    })
  }

  /**
   * Get cat facts from API and set state
   */
  async getCatFacts() {
    return fetch(`${CORS_PROXY}/https://catfact.ninja/facts?limit=25`)
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        const catFactArray = responseJSON.data.map((factObj) => {
          return factObj.fact;
        });

        this.setState({
          catFacts: catFactArray
        });
      }, (err) => {
        alert('There was an issue getting cats.');
      });
  }

  /** 
   * Sort by last word or key (to return to original sort order)
   */
  handleSortCats = (sortByLastWord) => {
    console.log('sorting')
    const sortParam = sortByLastWord ? 'lastWord' : 'id';
    let sortedCats = this.state.catObjectArray.sort((a, b) => {
      if (a[sortParam] < b[sortParam]) {
        return -1;
      } else if (a.lastWord > b.lastWord) {
        return 1;
      } else {
        return 0;
      }
    })

    this.setState({
      catObjectArray: sortedCats,
    });
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
  handleFavoriting = (cardObject) => {
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    if (!utils.isFavorite(favorites, cardObject.id)) {
      const lastWord = utils.getLastWord(cardObject.fact);

      favorites.push({
        id: cardObject.id,
        url: cardObject.url,
        fact: cardObject.fact,
        lastWord,
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
    if (this.state.isLoading) {
      return (
        <div>
          <Loading></Loading>
        </div>
      );
    } else {
      return (
        <div className="app">
          <Header sortCats={this.handleSortCats} toggleFavorites={this.toggleFavorites}></Header>
          <CatList catObjects={this.state.displayFavorites ? this.state.favorites : this.state.catObjectArray} handleFavoriting={this.handleFavoriting}/>
        </div>
      );
    }
  }
}

export default App;
