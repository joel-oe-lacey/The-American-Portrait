import React from 'react';
import { Region } from './Region';
import { shallow } from 'enzyme'

describe('Region', () => {
    it('should match a snapshot as expected', () => {
        const wrapper = shallow(<Region />)

        expect(wrapper).toMatchSnapshot()
    })
})
