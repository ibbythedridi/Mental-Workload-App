import React from 'react';
import renderer from 'react-test-renderer';
import AppContext from '../components/AppContext';
import ISA from '../screens/isa';

describe("ISA (Debug mode off)", () => {
  it('renders correctly', () => {
    const tree = renderer.create(
        <AppContext.Provider value={{debugMode:false}}>
          <ISA />
        </AppContext.Provider>
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has 2 children', () => {
    const tree = renderer.create(
      <AppContext.Provider value={{debugMode:false}}>
        <ISA />
      </AppContext.Provider>
    ).toJSON();
    expect(tree.children.length).toBe(2);
  });
});

describe("ISA (Debug mode on)", () => {
  it('renders correctly', () => {
    const tree = renderer.create(
        <AppContext.Provider value={{debugMode:true}}>
          <ISA />
        </AppContext.Provider>
      ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has 3 children', () => {
    const tree = renderer.create(
      <AppContext.Provider value={{debugMode:true}}>
        <ISA />
      </AppContext.Provider>
    ).toJSON();
    expect(tree.children.length).toBe(3);
  });
});