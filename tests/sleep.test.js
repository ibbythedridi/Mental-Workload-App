import React from 'react';
import renderer from 'react-test-renderer';
import Sleep from '../screens/sleep';
import AppContext from '../components/AppContext';

describe("Sleep", () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <AppContext.Provider value={{debugMode:false}}>
        <Sleep />
      </AppContext.Provider>
    ).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('has 2 children', () => {
    const tree = renderer.create(
      <AppContext.Provider value={{debugMode:false}}>
        <Sleep />
      </AppContext.Provider>
    ).toJSON();
    expect(tree.children.length).toBe(2);
  });
});