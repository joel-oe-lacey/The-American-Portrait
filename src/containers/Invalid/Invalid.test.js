import React from 'react';
import { Invalid } from './Invalid';
import { shallow } from 'enzyme';
import { mockCollectionPrimary, mockCollectionSecondary } from '../../utils/referenceData';

describe('Invalid Path', () => {
    it('should match a snapshot as expected', () => {
        const wrapper = shallow(<Invalid collections={[mockCollectionPrimary, mockCollectionSecondary]} />)

        expect(wrapper).toMatchSnapshot()
    })
})
