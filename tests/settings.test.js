import React from 'react';
import renderer from 'react-test-renderer';
import Settings from '../screens/settings';

it('renders settings correctly', () => {
  const tree = renderer.create(<Settings />).toJSON();
  expect(tree).toMatchSnapshot();
});

// This checks the correct component(s) are existent in the JSON
describe("<Settings />", () => {
  it('has 1 child', () => {
    const tree = renderer.create(<Settings />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});