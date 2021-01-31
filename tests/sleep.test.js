import React from 'react';
import renderer from 'react-test-renderer';
import Sleep from '../screens/sleep';

test('renders sleep correctly', () => {
  const tree = renderer.create(<Sleep />).toJSON();
  expect(tree).toMatchSnapshot();
});