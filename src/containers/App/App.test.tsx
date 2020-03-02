import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import { apiCall } from '../../utils/fetchCalls'

//for testing purposes, turn all of these functions into mock/jest functions
jest.mock('../apiCalls.js')

//for app just testing snapshot, or testing routes? 

describe('App', () => {
  beforeEach(() => {

    apiCall.mockImplementation(() => {
      return Promise.resolve()
    })
  })

  it('should match the snapshot', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should fetch all art on mount', async () => {
    // Setup
    //check component mount, 
    //import mock data from separate file 
    // test mapDispatch
    // should be called with structured data (also import from mock data file)
      //don't need to test restructuring 
  });
});
