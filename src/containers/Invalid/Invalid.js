import React from 'react';
import './Invalid.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Invalid = ({ collections }) => {
    const msg = (collections.length ? 'Page Not Found.' : 'Insufficient historical record, please try another state.')

    return (
        <section className="error">
            <section className="error-center">
                <h1>
                    {msg}
                </h1>
                <Link to="/">Home</Link>
            </section>
        </section>
    )
}

export const mapStateToProps = state => ({
    collections: state.collections,
});

export default connect(mapStateToProps)(Invalid)