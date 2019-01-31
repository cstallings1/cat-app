import React from 'react';
import { shallow, mount } from 'enzyme';
import CatList from './CatList';

const cats = [
  {
    fact: 'Cat families usually play best in even numbers. Cats and kittens should be acquired in pairs whenever possible.',
    id: '2n4',
    key: 1,
    lastWord: 'possible.',
    url: 'https://27.media.tumblr.com/tumblr_m1k4ttqFGk1r6b7kmo1_500.jpg',
  },
  {
    fact: 'A cat has more bones than a human being; humans have 206 and the cat has 230 bones.',
    id: '19r',
    lastWord: 'bones.',
    url: 'https://s3.us-west-2.amazonaws.com/cdn2.thecatapi.com/images/19r.gif',
  },
]

it('renders CatList', () => {
  shallow(<CatList cats={cats} />);
});

it('renders an empty CatList', () => {
  const wrapper = mount(<CatList cats={[]} />);
  expect(wrapper.find('.blank-state')).toHaveLength(1);
  wrapper.unmount();
});

it('renders a CatList with cards', () => {
  const wrapper = mount(<CatList cats={cats} />);
  expect(wrapper.find('.grid-item')).toHaveLength(2);
  wrapper.unmount();
});