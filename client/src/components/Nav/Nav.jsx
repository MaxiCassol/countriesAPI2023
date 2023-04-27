import { React, useState, useEffect } from 'react';
import style from "./Nav.module.css";
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCountries, getCountryByName } from "../../redux/actions";
import mundo from "../Images/mundo.gif"
import lupa from "../Images/lupa.png"



const Nav = ({setCurrentPage}) => {
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    const handleInputChange = (event) => {
        if(!event) dispatch(getCountries())
        
        dispatch(getCountryByName(event))
        // setCurrentPage(1)
    }

    return(
        <div setCurrentPage={setCurrentPage}  className={style.nav}>
            <Link to="/home">
                <img src={mundo} alt="" className={style.mundo}/>
            </Link>
            <Link to="/home" className={style.link}>
                <h3>HOME</h3>
            </Link>
            <Link to="/activities" className={style.link}>
                <h3>ADD ACTIVITY</h3>
            </Link>
            <Link to="/about" className={style.link}>
                <h3>ABOUT</h3>
            </Link>
            <div className = {style.searchDiv}>
                <img src={lupa} alt="lupa" className={style.lupa}/>
            <input 
                className = {style.search}
                value = {name}
                type = 'text'
                placeholder="Country"
                onChange = {(event) => {setName(event.target.value); handleInputChange(event.target.value)}} />
            </div>
            
            <Link to="/" className={style.link}>
                <h3>LogOut</h3>
            </Link>
            <Link to="/home" >
                <img src={mundo} alt="" className={style.mundo}/>
            </Link>  

        </div>    
    );
}



export default Nav;