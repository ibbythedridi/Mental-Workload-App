import React from 'react';
import renderer from 'react-test-renderer';
import AddISA from '../screens/addISA';

it('renders correctly', () => {
    const tree = renderer.create(<AddISA />).toJSON();
    expect(tree).toMatchSnapshot();
});

// This checks the correct component(s) are existent in the JSON (views and buttons)
describe("<AddISA />", () => {
  it('has 5 children', () => {
    const tree = renderer.create(<AddISA />).toJSON();
    expect(tree.children.length).toBe(5);
  });
});