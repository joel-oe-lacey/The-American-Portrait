import React, { Component } from 'react';
import './Carousel.scss';

//conditionally render forward or back based on length 
//pieces array come in as props
//deconstruct to display certain info 

//link to art piece on 

export default class Carousel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            i: 0,
        }
    }

    componentDidMount() {
        
    }

    changePiece = (direction) => {
        let { prevIndex } = this.state;
        let newIndex;

        if (direction === 'left') {
            newIndex = prevIndex - 1;
        } else {
            newIndex = prevIndex + 1;
        }

        this.setState({
            i: newIndex
        });
    }

    render() {
        // {image, } = this.props.pieces[this.state.i];
        return (<section className="carousel">
            <section className="carousel-disp">
                <img className='carousel-img' src="https://nrs.harvard.edu/urn-3:HUAM:756712" alt="roman emperor trajan" />
            </section>
            <section className="carousel-timeline">
                <button className='carousel-arrow-left' onClick={() => this.changePiece('left')}>←</button>
                <h2 className="timeline-prev">Prev Date</h2>
                <h1 className="timeline-curr">Curr Date</h1>
                <h2 className="timeline-next">Next Date</h2>
                <button className='carousel-arrow-right' onClick={() => this.changePiece('right')}>→</button>
            </section>
        </section>
    )}
}
