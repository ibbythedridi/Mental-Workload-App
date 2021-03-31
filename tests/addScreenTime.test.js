import React from 'react';
import renderer from 'react-test-renderer';
import AddScreenTime from '../screens/addScreenTime';

it('renders correctly', () => {
    const tree = renderer.create(<AddScreenTime />).toJSON();
    expect(tree).toMatchSnapshot();
});

// This checks the correct component(s) are existent in the JSON (views and buttons)
describe("<AddScreenTime />", () => {
  it('has 11 children', () => {
    const tree = renderer.create(<AddScreenTime />).toJSON();
    expect(tree.children.length).toBe(11);
  });
});