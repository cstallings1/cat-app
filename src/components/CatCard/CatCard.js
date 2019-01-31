import React, { Component } from 'react';
import './CatCard.css';
import ImageModal from '../ImageModal/ImageModal';
import utils from '../../utils';
import imagesLoaded from 'imagesloaded';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class CatCard extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    }
  }

  componentDidMount() {
    this.resizeAllGridItems();
    window.addEventListener('resize', this.resizeAllGridItems);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeAllGridItems);
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  /** 
   * Set the gridRowEnd property on a given grid item
   */
  resizeGridItem = (item) => {
    let gridContainer = document.getElementsByClassName('grid-container')[0];
    let rowHeight = parseInt(window.getComputedStyle(gridContainer).getPropertyValue('grid-auto-rows'));
    let rowGap = parseInt(window.getComputedStyle(gridContainer).getPropertyValue('grid-row-gap'));

    // Determine how many rows an item needs to span based on content height
    let rowSpan = Math.ceil((item.querySelector('.grid-content').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = 'span ' + rowSpan;
  }

  /** 
   * Resize each grid item once image has fully loaded
   */
  resizeAllGridItems = () => {
    let allItems = document.getElementsByClassName('grid-item');
    for (let i = 0; i < allItems.length; i++) {
      imagesLoaded(allItems[i], () => {
        if (allItems[i]) {
          this.resizeGridItem(allItems[i]);
        }
      });
    }
  }

  isFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem('favorites'));
    return utils.isFavorite(favorites, this.props.id);
  }

  renderModal = () =>{
    return (
      this.state.showModal &&
      <ImageModal onClose={this.toggleModal}>
        <CatCard
          key={this.props.objectkey}
          id={this.props.id}
          handleFavoriting={this.props.handleFavoriting}
          fact={this.props.fact}
          url={this.props.url}
        />
      </ImageModal>
    )
  }

  render() {
    const { fact, url } = this.props;
    return(
      <div className='grid-item' onClick={this.toggleModal}>
        {this.renderModal()}
        <div className='grid-content'>
          <FontAwesomeIcon
            size='lg'
            className='favorite-icon'
            color='white'
            icon={this.isFavorite() ? ['fas', 'heart'] : ['far', 'heart']}
            onClick={(e) => this.props.handleFavoriting(this.props, e)}
          />
          <img src={url} alt='cat' />
          <p>{fact}</p>
        </div>
      </div>
    )
  }
}

export default CatCard;