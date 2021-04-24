import React from 'react';
import renderer from 'react-test-renderer';
import AppContext from '../components/AppContext';
import Dashboard from '../screens/dashboard';

describe("Dashboard (Debug mode off)", () => {
  it('renders dashboard correctly', () => {
    const tree = renderer.create(
        <AppContext.Provider value={{debugMode:false}}>
          <Dashboard />
        </AppContext.Provider>
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has 4 children', () => {
    const tree = renderer.create(
      <AppContext.Provider value={{debugMode:false}}>
        <Dashboard />
      </AppContext.Provider>
    ).toJSON();
    expect(tree.children.length).toBe(4);
  });
});

describe("Dashboard (Debug mode on)", () => {
  it('renders dashboard correctly', () => {
    const tree = renderer.create(
        <AppContext.Provider value={{debugMode:true}}>
          <Dashboard />
        </AppContext.Provider>
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has 5 children', () => {
    const tree = renderer.create(
      <AppContext.Provider value={{debugMode:true}}>
        <Dashboard />
      </AppContext.Provider>
    ).toJSON();
    expect(tree.children.length).toBe(5);
  });
});