import { Link } from "react-router-dom";
import style from "./Card.module.css";
import React from "react";

export default function Card({id, flag, name, continent}) { //props, destructoring
   

   return (
      <div className={style.div}>
         <div>
            <img className={style.imag} src={flag} alt=""/>
         </div>
         <h1 className={style.name}>{name}</h1>
         <h3 className={style.Continent}>Continent: {continent}</h3>
         <div className={style.divButton} >
            <Link to = {`/countries/${id}`}>
            <button className={style.button}> Details </button>
         </Link>
         </div>
         
         
         
      </div>
   );
}

