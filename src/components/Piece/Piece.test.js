import React from 'react';
import { Piece } from './Piece';
import { shallow } from 'enzyme'

describe('Piece', () => {
    it('should match a snapshot as expected', () => {
        const wrapper = shallow(<Piece />)

        expect(wrapper).toMatchSnapshot()
    })
})
