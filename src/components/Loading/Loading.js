import React from 'react';
import './Loading.css';
import loadingIndicator from './loading.svg';

const Loading = () => (
  <div className='loading'>
    <img src={loadingIndicator} alt='loading' />
  </div>
)

export default Loading;