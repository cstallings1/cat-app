import React, { Component } from 'react';
import './CatCard.css';
import ImageModal from '../ImageModal/ImageModal';
import utils from '../../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class CatCard extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    }
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  renderModal = () =>{
    return (
      <ImageModal onClose={this.toggleModal}>
        <CatCard
          key={this.props.objectkey}
          id={this.props.id}
          handleToggleFavorite={this.props.handleToggleFavorite}
          fact={this.props.fact}
          url={this.props.url}
        />
      </ImageModal>
    )
  }

  render() {
    const { fact, url, id } = this.props;

    return(
      <div className='grid-item' onClick={this.toggleModal}>
        {this.state.showModal && this.renderModal()}
        <div className='grid-content'>
          <FontAwesomeIcon
            size='lg'
            className='favorite-icon'
            color='white'
            icon={utils.isFavorite(id) ? ['fas', 'heart'] : ['far', 'heart']}
            onClick={(e) => this.props.handleToggleFavorite(this.props, e)}
          />
          <img src={url} alt='cat' />
          <p>{fact}</p>
        </div>
      </div>
    )
  }
}

export default CatCard;