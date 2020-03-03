import React from 'react';
import { shallow } from 'enzyme';
import { Timeline, mapStateToProps } from './Timeline';
import { mockCollectionPrimary, mockCollectionSecondary } from '../../utils/referenceData';
//test map state to props 
//test indexing functionality 
//different snapshot for each conditional render? 

describe('Timeline', () => {
    let wrapper, instance;

    beforeEach(() => {
        wrapper = shallow(<Timeline collection={[mockCollectionPrimary, mockCollectionSecondary]} />);
        instance = wrapper.instance();
    });

    it('Should equal snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('Should subtract index for left click', () => {

        instance.setState({ i: 1, collection: [mockCollectionPrimary, mockCollectionSecondary]})

        instance.changePiece('left');

        expect(wrapper.state('i')).toEqual(0);
    });

    it('Should add to image index for right click', () => {
        instance.setState({ i: 0, collection: [mockCollectionPrimary, mockCollectionSecondary] })

        instance.changePiece('right');

        expect(wrapper.state('i')).toEqual(1);
    });

    describe('mapStateToProps', () => {
        it('should return an array of collection objects as a prop', () => {
            const mockState = {
                region: 'Colorado',
                collections: [mockCollectionPrimary, mockCollectionSecondary],
            }
            const expected = {
                collection: [mockCollectionPrimary, mockCollectionSecondary]
            }
            const mappedProps = mapStateToProps(mockState);
            expect(mappedProps).toEqual(expected)
        })
    })
});