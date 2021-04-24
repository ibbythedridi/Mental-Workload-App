import React from 'react';
import renderer from 'react-test-renderer';
import Settings from '../screens/settings';
import AppContext from '../components/AppContext';

jest.useFakeTimers();

describe("Settings", () => {
  it('renders settings correctly', () => {
    const tree = renderer.create(
      <AppContext.Provider value={{debugMode:false}}>
        <Settings />
      </AppContext.Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has 2 children', () => {
    const tree = renderer.create(
      <AppContext.Provider value={{debugMode:false}}>
        <Settings />
      </AppContext.Provider>
    ).toJSON();
    expect(tree.children.length).toBe(2);
  });
});