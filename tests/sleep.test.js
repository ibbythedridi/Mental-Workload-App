import React from 'react';
import renderer from 'react-test-renderer';
import Sleep from '../screens/sleep';
import DBHelper from '../DBHelper';

// An automatic mock of the DBHelper class, returns undefined to any calls
jest.mock('../DBHelper');

// Clear instances/calls
beforeEach(() => {
    DBHelper.mockClear();
});

it('renders correctly', () => {
    const tree = renderer.create(<Sleep />).toJSON();
    expect(tree).toMatchSnapshot();
});

// This checks the correct component(s) are existent in the JSON (views and buttons)
describe("<Sleep />", () => {
  it('has 3 children', () => {
    const tree = renderer.create(<Sleep />).toJSON();
    expect(tree.children.length).toBe(3);
  });
});