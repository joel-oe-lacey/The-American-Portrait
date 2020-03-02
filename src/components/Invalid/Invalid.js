import React from 'react';
import './Invalid.scss';
import { Link } from 'react-router-dom';

const Invalid = () => {
    return (
        <section className="error">
            <section className="error-center">
                <h1>
                    Page Not Found, navigate back to the timeline below:
                </h1>
                <Link to="/timeline">Timeline</Link>
            </section>
        </section>
    )
}

export default Invalid;