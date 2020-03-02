import React from 'react';
import './Piece.scss';
import { Link } from 'react-router-dom';

const Piece = ({ 
        title,
        objectid,
        creditline,
        century,
        technique,
        dated,
        people,
        primaryimageurl,
    }) => {

    // const mostSpecificPlace = terms.place.reverse()[0].name;

    const artist = people.find(person => person.role === "Artist");

    return (
        <section key={objectid} className="piece-cont">
            <img alt={title} src={primaryimageurl} className="piece-img"/>
            <article className="piece-desc">
                <span className="piece-grouping">
                    <header className="desc-header">
                        <h1>{title}</h1>
                        <h3>{`Dated: ${dated}`}</h3>
                    </header>
                    <section className="return-cont">
                        <Link to="/timeline" className="return-btn">X</Link>
                    </section>
                </span>
                {artist.birthplace ? 
                <main className="desc-main">
                    <h4>{`Artist: ${artist.name}`}</h4>
                    <h4>{artist.displaydate}</h4>
                    <h4>{`Born: ${artist.birthplace}`}</h4>
                    <h4>{`Died: ${artist.deathplace}`}</h4>
                </main> :
                <main className="desc-main">
                    <h4>{`Artist: ${artist.name}`}</h4>
                </main> }
                <footer className="desc-footer">
                    <h4>{century}</h4>
                    <h4>{`Technique: ${technique}`}</h4>
                    <h3>{creditline}</h3>
                </footer>
            </article>
        </section>
    )
}

export default Piece;