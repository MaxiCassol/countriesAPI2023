import React from 'react';
import { Link } from "react-router-dom";
import style from './Landing.module.css';
import video from '../Images/video.mp4'

export default function LandingPage(){
    return (
        <div className={style.div}>
            <video autoplay="true" muted loop="false" className={style.video}>
                <source src={video} type="video/mp4"/>
            </video>
            
            <div className={style.divWelcome}>
                <h1 className={style.Welcome}>My Memories</h1>
            </div>
            <div className={style.divText}>
                <div className={style.h2}>
                    <h1 className={style.life}>"Life is a journey, enjoy it!"</h1>
                    <h2 className={style.old}>Document all the adventures you've had across the globe.</h2>
                    
                </div>
            </div>
            
            <Link to= "/home" className={style.divButton}>
                <button className={style.b}> Enter Here </button>
            </Link>
        </div>
    )
}