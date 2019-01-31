import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

it('renders Header', () => {
  shallow(<Header />);
});

it('changes state when clicking on title', () => {
  const mockClick = jest.fn();
  const wrapper = shallow(<Header handleTitleClick={mockClick} sortCats={mockClick} toggleFavorites={mockClick}/>);
  wrapper.setState({ displayFavorites: true });
  wrapper.find('.header-title').simulate('click');
  expect(wrapper.state().displayFavorites).toEqual(false);
  expect(mockClick).toHaveBeenCalled();
  wrapper.unmount();
});
