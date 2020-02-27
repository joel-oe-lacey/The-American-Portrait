import React from 'react';
import './Piece.scss';

const Piece = ({ 
    primaryimageurl, 
    title, 
    objectid, 
    description, 
    century,
    dated,
    culture,
    classification,
    technique,
    medium,
    colors,
    creditline,
    labeltext}) => {
    return (
        <section key={objectid} className="piece-cont">
            <img alt={description} src={primaryimageurl} />
            <article className="desc">
                <header className="desc-header">
                    <h1>{title}</h1>
                    <h3>{century}</h3>
                </header>
                <main className="desc-main">
                    <p>{labeltext}</p>
                </main>
                <footer className="desc-footer">
                    <ul>
                        <li>{dated}</li>
                        <li>{culture}</li>
                        <li>{medium}</li>
                        <li>{technique}</li>
                        <li>{creditline}</li>
                    </ul>
                </footer>
            </article>
        </section>
    )
}

export default Piece;