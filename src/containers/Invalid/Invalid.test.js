import React from 'react';
import { Invalid, mapStateToProps } from './Invalid';
import { shallow } from 'enzyme';
import { mockCollectionPrimary, mockCollectionSecondary } from '../../utils/referenceData';

describe('Invalid Path', () => {
    it('should match a snapshot as expected', () => {
        const wrapper = shallow(<Invalid collections={[mockCollectionPrimary, mockCollectionSecondary]} />)

        expect(wrapper).toMatchSnapshot()
    })

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
})
