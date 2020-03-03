import React from 'react';
import './Invalid.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export const Invalid = ({ collections }) => {
    // const msg = (collections.length ? 'Page Not Found.' : 'Insufficient historical record, please try another state.')

    return (
        <section className="error">
            <section className="error-center">
                <h1>
                    Page error, or there are no available photos.
                </h1>
                <h2>
                    Please begin again.
                </h2>
                <Link to="/" className="home-link">Home</Link>
            </section>
        </section>
    )
}

export const mapStateToProps = state => ({
    collections: state.collections,
});

export default connect(mapStateToProps)(Invalid)