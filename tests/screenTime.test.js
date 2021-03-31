import React from 'react';
import renderer from 'react-test-renderer';
import ScreenTime from '../screens/screenTime';
import DBHelper from '../DBHelper';

// An automatic mock of the DBHelper class, returns undefined to any calls
jest.mock('../DBHelper');

// Clear instances/calls
beforeEach(() => {
    DBHelper.mockClear();
});

it('renders correctly', () => {
    const tree = renderer.create(<ScreenTime />).toJSON();
    expect(tree).toMatchSnapshot();
});

// This checks the correct component(s) are existent in the JSON (views and buttons)
describe("<ScreenTime />", () => {
  it('has 3 children', () => {
    const tree = renderer.create(<ScreenTime />).toJSON();
    expect(tree.children.length).toBe(3);
  });
});