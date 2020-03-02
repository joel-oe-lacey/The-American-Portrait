import React from 'react';
import './Loading.scss';
import { Link } from 'react-router-dom';

const Loading = () => {
    return (
        <section className="alert">
            <section className="alert-center">
                <h1>
                    "The land flourished because it was fed from so many sources--because it was nourished by so many cultures and traditions and peoples." 
                </h1>
                <h2>
                    Lyndon B. Johnson
                </h2>
                <h3>
                    Loading Data...
                </h3>
                <Link to="/">Return Home</Link>
            </section>
        </section>
    )
}

export default Loading;