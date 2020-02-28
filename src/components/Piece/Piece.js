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
    labeltext
    }) => {

    return (
        <section key={objectid} className="piece-cont">
            <img alt={description} src={primaryimageurl} className="piece-img"/>
            <article className="piece-desc">
                <header className="desc-header">
                    <h1>{title}</h1>
                    <h3>{century}</h3>
                </header>
                <main className="desc-main">
                    <p>{labeltext ? labeltext : description}</p>
                </main>
                <footer className="desc-footer">
                    <h4>{`Dated: ${dated}`}</h4>
                    <h4>{`Medium: ${medium}`}</h4>
                    <h4>{`Technique: ${technique}`}</h4>
                    <h4>{creditline}</h4>
                </footer>
            </article>
        </section>
    )
}

export default Piece;