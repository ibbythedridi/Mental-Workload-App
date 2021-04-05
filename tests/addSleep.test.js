import React from 'react';
import renderer from 'react-test-renderer';
import AddSleep from '../screens/addSleep';


it('renders correctly', () => {
    const tree = renderer.create(<AddSleep />).toJSON();
    expect(tree).toMatchSnapshot();
});

// This checks the correct component(s) are existent in the JSON (views and buttons)
describe("<AddScreenTime />", () => {
  it('has 6 children', () => {
    const tree = renderer.create(<AddSleep />).toJSON();
    expect(tree.children.length).toBe(6);
  });
});