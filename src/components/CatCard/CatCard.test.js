import React from 'react';
import { shallow } from 'enzyme';
import CatCard from './CatCard';

const mockClick = jest.fn();
const key = '1';
const id = '2n4';
const handleToggleFavorite = mockClick;
const fact = 'Cat families usually play best in even numbers. Cats and kittens should be acquired in pairs whenever possible.';
const url = 'https://27.media.tumblr.com/tumblr_m1k4ttqFGk1r6b7kmo1_500.jpg';

it('renders without crashing', () => {
  shallow(
    <CatCard
      key={key}
      id={id}
      handleToggleFavorite={handleToggleFavorite}
      fact={fact}
      url={url}
    />
  );
});