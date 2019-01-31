import React, { Component } from 'react';
import CatCard from '../CatCard/CatCard';
import BlankState from '../BlankState/BlankState';
import './CatList.css';
import imagesLoaded from 'imagesloaded';

/** 
* Set the gridRowEnd property on a given grid item
*/
const resizeGridItem = (item) => {
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
const resizeAllGridItems = () => {
  let allItems = document.getElementsByClassName('grid-item');
  imagesLoaded(allItems, () => {
    for (let i = 0; i < allItems.length; i++) {
      if (allItems[i]) {
        resizeGridItem(allItems[i]);
      }
    }

    if (document.querySelector('.grid-container')) {
      document.querySelector('.grid-container').classList.remove('hide');
      document.querySelector('.grid-container').classList.add('show');
    }
  });
}

class CatList extends Component {
  componentDidMount() {
    window.addEventListener('resize', resizeAllGridItems);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', resizeAllGridItems);
  }
  render() {
    const { handleToggleFavorite, handleLoadingComplete, cats } = this.props;

    setTimeout(() => {
      resizeAllGridItems();  
    }, 0);
    
    return (
      cats.length ?
        <div className='grid-container hide'>
          {cats.map((cat) => (
            <CatCard
              handleLoadingComplete={handleLoadingComplete}
              handleToggleFavorite={handleToggleFavorite}
              key={cat.id}
              objectKey={cat.key}
              id={cat.id}
              fact={cat.fact}
              url={cat.url}
            />
          ))}
        </div>
        : <BlankState text="Sorry, we couldn't find any cats" />
    );
  }
}

export default CatList;