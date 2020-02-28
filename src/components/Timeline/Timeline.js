import React, { Component } from 'react';
import './Timeline.scss';
import { connect } from 'react-redux';

//conditionally render forward or back based on length 
//pieces array come in as props
//deconstruct to display certain info 

//link to art piece on 

export class Timeline extends Component {
    constructor({ collection }) {
        super({ collection })
        this.state = {
            collection,
            i: 0,
        }
    }

    componentDidMount() {
        //fetch
        //run through helper
        //add to store
        //add to local storage 
    }

    changePiece = (direction) => {
        let { i, collection } = this.state;
        let endIndex = collection.length;
        let newIndex;

        if (direction === 'left') {
            newIndex = i ? i - 1 : 0;
        } else {
            newIndex = ((i === endIndex) ? i : i + 1);
        }

        this.setState({
            i: newIndex
        });
    }

    render() {
        const { collection, i } = this.state;

        return (
        <section className="carousel">
            <section className="carousel-disp">
                <img className='carousel-img' src={collection[i].primaryimageurl} alt="roman emperor trajan" />
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

export const mapStateToProps = state => ({
    regions: state.regions,
});

export default connect(mapStateToProps)(Timeline)
