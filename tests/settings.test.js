import React from 'react';
import renderer from 'react-test-renderer';
import Settings from '../screens/settings';

test('renders settings correctly', () => {
  const tree = renderer.create(<Settings />).toJSON();
  expect(tree).toMatchSnapshot();
});