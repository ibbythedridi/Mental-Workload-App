import React from 'react';
import renderer from 'react-test-renderer';
import Dashboard from '../screens/dashboard';

it('renders dashboard correctly', () => {
  const tree = renderer.create(<Dashboard />).toJSON();
  expect(tree).toMatchSnapshot();
});

// This checks the correct component(s) are existent in the JSON (views and buttons)
describe("<Dashboard />", () => {
  it('has 9 children (dashboard components)', () => {
    const tree = renderer.create(<Dashboard />).toJSON();
    expect(tree.children.length).toBe(9);
  });
});