import React from 'react';
import renderer from 'react-test-renderer';
import ISA from '../screens/isa';

it('renders correctly', () => {
  const tree = renderer.create(<ISA />).toJSON();
  expect(tree).toMatchSnapshot();
});

// This checks the correct component(s) are existent in the JSON (views and buttons)
// 3 children in the default view without any states changed
describe("<ISA />", () => {
  it('has 3 children', () => {

    const tree = renderer.create(<ISA />).toJSON();
    expect(tree.children.length).toBe(3);
  });
});