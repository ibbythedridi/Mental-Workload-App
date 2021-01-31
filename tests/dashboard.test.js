import React from 'react';
import renderer from 'react-test-renderer';
import Dashboard from '../screens/dashboard';

test('renders dashboard correctly', () => {
  const tree = renderer.create(<Dashboard />).toJSON();
  expect(tree).toMatchSnapshot();
});