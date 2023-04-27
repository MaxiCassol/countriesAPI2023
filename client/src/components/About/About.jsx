/* eslint-disable no-useless-constructor */
import React from 'react';
import perfil from '../Images/Perfil.jpg';
import linkedin from '../Images/linkedin.jpg';
import git from '../Images/git.jpg';
import style from "./About.module.css";

class About extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={style.about}>

                <img src={perfil} className={style.img} alt=""/>

                <h1>Design by: Maximiliano Cassol Montagner </h1>
                <h2>FULL STACK DEVELOPER - Soy Henry</h2>
                <hr />
                <div>
                    <h2>You can search the world by country </h2>
                    <h2>Add activities you can do in each of them. </h2>
                    <h2>Hope you enjoy it!</h2>
                </div>
                
                <hr />
                <div>

                </div>
                <h2>Includes:</h2>
                <ul>
                    <li>Frontend (Javascrypt, html y css)</li>
                    <li>Backend (Javascrypt)</li>
                    <li>Database (Postgres)</li>
                    <li>Server connected with an external API</li>
                </ul>
                <hr />
                <div className={style.logos}>
                    <a href="https://www.linkedin.com/in/maximilianocassol/" target="_blank" rel="noopener noreferrer">
                    <img className={style.linkedIn} src={linkedin} alt="linkedin" />
                    </a>
                    <a href="https://github.com/MaxiCassol" target="_blank" rel="noopener noreferrer">
                    <img className={style.git} src={git} alt="github" />
                    </a>

                </div>
                
                
            </div>
        );
    }
}

export default About; 