import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps } from './App';
import { mockCollectionPrimary, mockCollectionSecondary } from '../../utils/referenceData';


describe('App', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    it('should return an array of collection objects as a prop', () => {
      const mockState = {
        region: 'Colorado',
        collections: [mockCollectionPrimary, mockCollectionSecondary],
      }
      const expected = {
        collections: [mockCollectionPrimary, mockCollectionSecondary]
      }
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected)
    })
  })
});
