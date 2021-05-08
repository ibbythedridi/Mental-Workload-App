import React from 'react';
import renderer from 'react-test-renderer';
import ScreenTime from '../screens/screenTime';
import AppContext from '../components/AppContext';

describe("ScreenTime (Debug mode off)", () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <AppContext.Provider value={{debugMode:false}}>
        <ScreenTime />
      </AppContext.Provider>
    ).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('has 2 children', () => {
    const tree = renderer.create(
      <AppContext.Provider value={{debugMode:false}}>
        <ScreenTime />
      </AppContext.Provider>
    ).toJSON();
    expect(tree.children.length).toBe(2);
  });
});

describe("ScreenTime (Debug mode on)", () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <AppContext.Provider value={{debugMode:true}}>
        <ScreenTime />
      </AppContext.Provider>
    ).toJSON();
      expect(tree).toMatchSnapshot();
  });

  it('has 3 children', () => {
    const tree = renderer.create(
      <AppContext.Provider value={{debugMode:true}}>
        <ScreenTime />
      </AppContext.Provider>
    ).toJSON();
    expect(tree.children.length).toBe(3);
  });
});