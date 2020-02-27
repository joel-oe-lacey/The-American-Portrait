//creating a timeline component
//have a line that displays a node for each date
//be able to click forward or back
//don't want to just show just the one piece, want to show a number of pieces 
//need a scroll and position in the center 

//display year in the center
//will need to be class based and have state 
//left and right of date will show next date above line 

//on mount fetch all art pieces for region
//store art in state as well as pass to carousel 
//clear store on unmount? 

import React, { Component } from 'react';
import './Timeline.scss';
import { apiCall } from '../../utils/fetchCalls';

class Timeline extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <section></section>
        )
    }
}