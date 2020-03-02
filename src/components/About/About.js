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

        return (
            <section className="introduction">
                <section className="intro-center">
                    <h1>
                        The American Portrait
                    </h1>
                    <article>
                        {introText}
                    </article>
                    <select name="state" onChange={this.chooseState}>
                        {stateSelectOptions}
                    </select>
                    <Link 
                    to="/timeline"
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