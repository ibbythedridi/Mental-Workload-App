import React from 'react';
import renderer from 'react-test-renderer';
import ScreenTime from '../screens/screenTime';

test('renders screen time correctly', () => {
  const tree = renderer.create(<ScreenTime />).toJSON();
  expect(tree).toMatchSnapshot();
});