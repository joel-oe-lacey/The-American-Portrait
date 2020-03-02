import React from 'react';
import { shallow } from 'enzyme';
import { Timeline } from './Timeline';

//test map state to props 
//test indexing functionality 
//different snapshot for each conditional render? 

describe('Timeline', () => {
    let wrapper;

    beforeEach(() => {
    wrapper = shallow(<Timeline />);
    });

    it('Should equal snapshot', () => {
        const wrapper = shallow(<Timeline />);
        expect(wrapper).toMatchSnapshot();
    });

    it('Should subtract index for left click', () => {
        wrapper.instance().setState({i: 10, collection: [1,2,3,4,5]})

        wrapper.instance().changePiece('left');

        expect(wrapper.state('i')).toEqual(9);
    });

    it('Should add to image index for right click', () => {
        wrapper.instance().setState({ i: 10, collection: [1, 2, 3, 4, 5] })

        wrapper.instance().changePiece('right');

        expect(wrapper.state('i')).toEqual(11);
    });
});