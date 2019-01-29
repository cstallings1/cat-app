import React from 'react';
import './BlankState.css';
import emptyIcon from './cat.ico';

const BlankState = ({text}) => (
  <div className='blank-state'>
    <img src={emptyIcon} alt='sad-cat' />
    <h3>{text}</h3>
  </div>
);

export default BlankState;