import React from 'react';
import { shallow } from 'enzyme';
import BlankState from './BlankState';

it('renders without crashing', () => {
  shallow(<BlankState text='No results found'/>);
});

it('displays correct text', () => {
  const wrapper = shallow(<BlankState text='No results found' />);
  expect(wrapper.find('h3').text()).toBe('No results found');
  wrapper.unmount();
});