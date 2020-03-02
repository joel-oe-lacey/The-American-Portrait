import React, { Component } from 'react';
import './Timeline.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class Timeline extends Component {
    constructor({ collection }) {
        super()
        this.state = {
            collection,
            i: 0,
        }
    }

    changePiece = (direction) => {
        let { i, collection } = this.state;
        let endIndex = collection.length - 1;
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
        const { i } = this.state;
        const { collection } = this.props;
        let endIndex = collection.length - 1;
        //abstract index checking into another function to reduce redundancy 
        //perhaps make below a component
        const positionIndicator = collection.map((item, mapIndex) => {
            if(i === mapIndex) {
                return <h4 className="position-active">.</h4>
            }
            return <h4 className="position-inactive">.</h4>
        })

        return (
        <section className="carousel">
            <section className="carousel-disp">
                    {(i !== 0) && <img className='carousel-img-prev'
                        src={collection[i-1].primaryimageurl}
                        alt={collection[i-1].description} />}
                <Link to={`piece/${collection[i].objectid}`} className='carousel-link' >
                    <img className='carousel-img' 
                    src={collection[i].primaryimageurl} 
                    alt={collection[i].description}  />
                </Link>
                    {(i !== endIndex) && <img className='carousel-img-next'
                        src={collection[i + 1].primaryimageurl}
                        alt={collection[i + 1].description} />}
            </section>
            <h1 className="carousel-title">{collection[i].title}</h1>
            <section className="carousel-position">
                {positionIndicator}
            </section>
            <section className="carousel-timeline">
                    <button className='carousel-arrow-left' onClick={() => this.changePiece('left')}>←</button>
                    <h2 className="timeline-prev">{i ? collection[i-1].dateend : ''}</h2>
        <h1 className="timeline-curr">{collection[i].dateend}</h1>
                    <h2 className="timeline-next">{i === endIndex ? '' : collection[i + 1].dateend}</h2>
                    <button className='carousel-arrow-right' onClick={() => this.changePiece('right')}>→</button>
            </section>
        </section>
    )}
}

export const mapStateToProps = state => ({
    collection: state.collections,
});

export default connect(mapStateToProps)(Timeline)
