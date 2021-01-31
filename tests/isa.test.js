import React from 'react';
import renderer from 'react-test-renderer';
import ISA from '../screens/isa';

test('renders isa correctly', () => {
  const tree = renderer.create(<ISA />).toJSON();
  expect(tree).toMatchSnapshot();
});