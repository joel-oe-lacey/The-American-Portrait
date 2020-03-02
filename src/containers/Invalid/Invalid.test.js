import React from 'react';
import { Invalid } from './Invalid';
import { shallow } from 'enzyme'

describe('Invalid Path', () => {
    it('should match a snapshot as expected', () => {
        const wrapper = shallow(<Invalid />)

        expect(wrapper).toMatchSnapshot()
    })
})
