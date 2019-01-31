import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it ('calls getCatFacts() on mount', () => {
  const wrapper = shallow(<App />);
  const instance = wrapper.instance();
  jest.spyOn(instance, 'getCatFacts');
  instance.componentDidMount();
  expect(instance.getCatFacts).toHaveBeenCalled();
  wrapper.unmount();
})

it('calls getCatImages() on mount', () => {
  const wrapper = shallow(<App />);
  const instance = wrapper.instance();
  jest.spyOn(instance, 'getCatImages');
  instance.componentDidMount();
  expect(instance.getCatImages).toHaveBeenCalled();
  wrapper.unmount();
})
