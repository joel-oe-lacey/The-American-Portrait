import React, { Component }  from 'react';
import './About.scss';
import { Link } from 'react-router-dom';
import { introText, stateNames } from '../../utils/referenceData';
import { loadRegion } from '../../actions';
import { connect } from 'react-redux';

export class About extends Component {
    constructor() {
        super();
        this.state = {
            region: 'Alabama'
        }
    }

    chooseState = e => {
        this.setState({ region: e.target.value });   
    }

    render() {
        const stateSelectOptions = stateNames.map(state => {
            return (
                <option value={`${state}`}>{`${state}`}</option> 
            )
        })

        const introDisplay = introText.map(paragraph => <p>{`${paragraph}`}</p>)
        return (
            <section className="introduction">
                <section className="intro-center">
                    <h1>
                        The American Portrait
                    </h1>
                    <article className="intro-text">
                        {introDisplay}
                    </article>
                    <select 
                        name="state" 
                        onChange={this.chooseState}
                        className="intro-selection">
                        <option value="" disabled selected>Please choose a state.</option>
                        {stateSelectOptions}
                    </select>
                    <Link 
                        to="/region"
                        className="intro-link"
                        onClick={() => this.props.loadRegionToStore(this.state.region)}
                    >Continue</Link>
                </section>
            </section>
        )
    }
}

export const mapDispatchToProps = dispatch => ({
    loadRegionToStore: (region) => { dispatch(loadRegion(region)) },
});

export default connect(null, mapDispatchToProps)(About)