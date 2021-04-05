import React from 'react';
import renderer from 'react-test-renderer';
import Sleep from '../screens/sleep';

it('renders correctly', () => {
    const tree = renderer.create(<Sleep />).toJSON();
    expect(tree).toMatchSnapshot();
});

// This checks the correct component(s) are existent in the JSON (views and buttons)
describe("<Sleep />", () => {
  it('has 1 child', () => {
    const tree = renderer.create(<Sleep />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});