import React from 'react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import Loading from './Loading';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Loading />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('has a loading indicator image', () => {
  const wrapper = shallow(<Loading />);
  expect(wrapper.find('img')).toHaveLength(1);
  wrapper.unmount();
});
