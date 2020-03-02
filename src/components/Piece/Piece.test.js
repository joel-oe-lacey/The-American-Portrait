import React from 'react';
import { Piece } from './Piece';
import { shallow } from 'enzyme';
import { mockCollectionPrimary } from '../../utils/referenceData';

describe('Piece', () => {
    it('should match a snapshot as expected', () => {
        const wrapper = shallow(<Piece {...mockCollectionPrimary}/>)

        expect(wrapper).toMatchSnapshot()
    })
})
