import React from 'react';
import renderer from 'react-test-renderer';
import ScreenTime from '../screens/screenTime';

it('renders screen time correctly', () => {
  const tree = renderer.create(<ScreenTime />).toJSON();
  expect(tree).toMatchSnapshot();
});

// This checks the correct component(s) are existent in the JSON
describe("<ScreenTime />", () => {
  it('has 1 children', () => {
    const tree = renderer.create(<ScreenTime />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});