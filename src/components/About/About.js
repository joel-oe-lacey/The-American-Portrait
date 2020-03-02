import React from 'react';
import './About.scss';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <section className="introduction">
            <section className="intro-center">
                <h1>
                    The American Portrait
                </h1>
                <article>
                    "People are trapped in history, and history is trapped in them" said James Baldwin in his 1953 essay "Stranger in the Village". At the time he spoke of the indivisibility of black culture from collective American culture and ethos as a whole. 

                    A continuation of that allegory, I believe, also speaks to the importance of remaining in touch with our collective history. It, in similar duality, is a part of us all. 
                    
                    The American Portrait looks to reunite us with a visual piece of that history. Utilizing the Harvard Museum API, you can view a timeline of historic photos by state, ten per decade where available. 
                    
                    While incomplete and historically biased, these photos offer us at very least a partial window into some of the lives, events, and adolescent places that would go on to form the nation as we know it. 
                </article>
                <Link to="/timeline">Continue</Link>
            </section>
        </section>
    )
}

export default About;