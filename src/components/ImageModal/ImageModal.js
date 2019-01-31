import React from 'react';
import ReactDOM from 'react-dom';
import './ImageModal.css';

const modalRoot = document.getElementById('modal-root');

class ImageModal extends React.Component {
  el = document.createElement('div');

  constructor() {
    super();
    this.handleEscapePress = this.handleEscapePress.bind(this);
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
    document.addEventListener('keydown', this.handleEscapePress);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
    document.removeEventListener('keydown', this.handleEscapePress);
  }

  handleEscapePress(e) {
    if (e.keyCode === 27) {
      this.props.onClose();
    }
  };

  render() {
    return ReactDOM.createPortal(
      <div className='modal-blackout' onClick={this.props.onClose}>
        <div className='modal-container'>
          <div className='modal-content'>
            {this.props.children}
          </div>
        </div>
      </div>,
      this.el
    )
  }
}

export default ImageModal;