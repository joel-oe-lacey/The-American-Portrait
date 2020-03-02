import React from 'react';
import { Region, mapDispatchToProps } from './Region';
import { shallow } from 'enzyme';
import { loadCollection, loadSubsqCollection } from '../../actions';
import { mockCollectionPrimary } from '../../utils/referenceData';


describe('Region', () => {
    it('should match a snapshot as expected', () => {
        const wrapper = shallow(<Region />)

        expect(wrapper).toMatchSnapshot()
    })

    it('should fetch all art on mount', async () => {
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
})
