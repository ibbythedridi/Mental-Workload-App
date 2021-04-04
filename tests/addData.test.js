import React from 'react';
import renderer from 'react-test-renderer';
import AddData from '../screens/addData';

it('renders correctly', () => {
    const tree = renderer.create(<AddData />).toJSON();
    expect(tree).toMatchSnapshot();
});

// This checks the correct component(s) are existent in the JSON (views and buttons)
describe("<AddData />", () => {
  it('has 6 children', () => {
    const tree = renderer.create(<AddData />).toJSON();
    expect(tree.children.length).toBe(6);
  });
});