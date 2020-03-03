import React from 'react';
import { About, mapDispatchToProps } from './About';
import { shallow } from 'enzyme';
import { loadRegion } from '../../actions';

describe('About', () => {
    it('should match a snapshot as expected', () => {
        const wrapper = shallow(<About />)
        
        expect(wrapper).toMatchSnapshot()
    })

    describe('mapDispatchToProps', () => {
        it('call dispatch with the loadRegion action when loadRegionToStore is called', () => {
            const mockDispatch = jest.fn();
            const region = "Colorado";
            const actionToDispatch = loadRegion(region)
            const mappedProps = mapDispatchToProps(mockDispatch)

            mappedProps.loadRegionToStore(region)

            expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
        })
    })
})
