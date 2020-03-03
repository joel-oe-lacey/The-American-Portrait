import React from 'react';
import { Region, mapDispatchToProps, mapStateToProps } from './Region';
import { apiCall } from '../../utils/fetchCalls';
import { shallow } from 'enzyme';
import { loadCollection, loadSubsqCollection } from '../../actions';
import { mockCollectionPrimary, mockCollectionSecondary } from '../../utils/referenceData';

jest.mock('../../utils/fetchCalls.js')

describe('Region', () => {
    let wrapper, instance;

    beforeEach(() => {
        wrapper = shallow(<Region />);
        instance = wrapper.instance();
    });

    it('should match a snapshot as expected', () => {
        expect(wrapper).toMatchSnapshot()
    })

    it('should fetch a region on mount', async () => {
        apiCall.mockImplementation(() => {
            return Promise.resolve({records: [{id: 1}]})
        })
        const expected = 1;
        const region = instance.retrieveRegionCode();

        expect(region).toEqual(expected);
        //returns promise object to be handled

        // Setup
        //check component mount, 
        //import mock data from separate file 
        // test mapDispatch
        // should be called with structured data (also import from mock data file)
        //don't need to test restructuring 
    });

    describe('mapDispatchToProps', () => {
        it('call dispatch with the loadCollection action when loadCollectionToStore is called', () => {
            const mockDispatch = jest.fn();
            const collection = mockCollectionPrimary;
            const actionToDispatch = loadCollection(collection)
            const mappedProps = mapDispatchToProps(mockDispatch)

            mappedProps.loadCollectionToStore(collection)

            expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
        })

        it('call dispatch with the loadSubsqCollection action when loadSubsqCollectionToStore is called', () => {
            const mockDispatch = jest.fn();
            const collection = mockCollectionPrimary;
            const actionToDispatch = loadSubsqCollection(collection)
            const mappedProps = mapDispatchToProps(mockDispatch)

            mappedProps.loadSubsqCollectionToStore(collection)

            expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
        })
    })

    describe('mapStateToProps', () => {
        it('should return an array of collection objects as a prop', () => {
            const mockState = {
                region: 'Colorado',
                collections: [mockCollectionPrimary, mockCollectionSecondary],
                testProp: false
            }
            const expected = {
                region: 'Colorado',
                collections: [mockCollectionPrimary, mockCollectionSecondary]
            }
            const mappedProps = mapStateToProps(mockState);
            expect(mappedProps).toEqual(expected)
        })
    })
})
