import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getCountries,
    getActivities,
    filterByContinents,
    filterByActivity,
    orderByName,
    orderByPopulation
} from "../../redux/actions";
import Card from "../Card/Card";
import style from "./Home.module.css";
import Paginado from "../Paginado/Paginado";

export default function Home() {
    const dispatch = useDispatch();
    //viene del reducer:
    const allCountries = useSelector((state) => state.countries)
    const activities = useSelector((state) => state.allActivities);

    const [order, setOrder] = useState('');
    const [filters, setFilters] = useState({
        continent:"",
        population:"",
        name:"",
        activity:""
    }) 
    const [initialFilters, setInitialFilters] = useState({
        continent:"",
        population:"",
        name:"",
        activity:""
    })

    //Paginado
    const [currentPage, setCurrentPage] = useState(1); // para que la pagina actual empiece en 1
    const [countriesPerPage, setCountriesPerPage] = useState(10); // 10 tarjetas por pagina
    const indexOfLastCountry = currentPage * countriesPerPage; //indice del ultimo pais de la pagina
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage; //indice del primer pais
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry); //paises de la pagina actual desde el 1 count al ultimo

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber) // seteo la pagina actual con ese numero de paginado
    };

    useEffect (() => {
        dispatch(getCountries());
        dispatch(getActivities())
    },[dispatch])


    const handleSort = (e) => {
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setFilters(e.target.value)
        setOrder(`Ordenado ${e.target.value}`)
    }

    const handlePopulation = (e) => {
        dispatch(orderByPopulation(e.target.value))
        setCurrentPage(1)
        setFilters(e.target.value)
        setOrder(`Ordenado ${e.target.value}`)
    }

    const handleContinentFilter = (e) => {
        dispatch(filterByContinents(e.target.value))
        setCurrentPage(1)
        setFilters(e.target.value)
    }

    const handleFilterActivity = (e) => {
        dispatch(filterByActivity(e.target.value))
        setCurrentPage(1)        
        setFilters(e.target.value)
    }

    const resetFilters = () => {
        setFilters(initialFilters)
        dispatch(getCountries());
        setFilters(initialFilters)
        setCurrentPage(1)
        setOrder("")
    }

    return (
        <div >
            <div className={style.leyenda}>
                <h3 >
                    
                </h3>
            </div>
            <div className={style.filters}>
                <div>
                    Order by Name:
                    <select className = {style.selection} onChange={handleSort} value = {filters.name}>
                        <option value = "None"> </option>
                        <option value = "asc">A-Z</option>
                        <option value = "desc">Z-A</option>
                    </select>
                </div>
                <div>
                    Order by Habitants:
                    <select className={style.selection} onChange={handlePopulation} value={filters.population}>
                        <option value="None"> </option>
                        <option value="bigPop">Smaller </option>
                        <option value="smallPop">Larger</option>
                    </select>
                </div>
                <div>
                    Search by Continent:
                    <select className={style.selection} onChange={(event)=>{handleContinentFilter(event)}} value={filters.continent}>
                        <option value=""disabled selected hidden>Select a continent</option>
                        <option value='All'>All Countries</option>
                        <option value='South America'>South America</option>
                        <option value='North America'>North America</option>
                        <option value='Europe'>Europe</option>
                        <option value='Asia'>Asia</option>
                        <option value='Africa'>Africa</option>
                        <option value='Oceania'>Oceania</option>
                        <option value='Antarctica'>Antarctica</option>
                    </select>
                </div>
                <div>
                    Search by Activity:
                    {activities.length === 0
                    ? (<p>No Activity yet</p>)
                    : (<select
                    className={style.selection}
                    onChange={handleFilterActivity}
                    value={filters.activity}>
                        <option value="All"></option>
                        {activities.map((activity) => (
                            <option value={activity.name} key={activity.id}>{activity.name}</option>
                        ))}
                    </select>)}
                </div>
                <div >
                    <button onclick={resetFilters} className={style.button}>Clean Filters</button>
                </div>
            </div>
            <div className={style.cards}>
                {currentCountries.length ? (currentCountries.map((country) => {
                    return(
                        <div className={style.card}>
                            <Card 
                            flag={country.flag}
                            name={country.name}
                            continent={country.continent}
                            key ={country.id}
                            id ={country.id}
                            />
                        </div>
                    )
                })
                ):(<h1>No country</h1>)}
                {/* {console.log(currentCountries)} */}
            </div>
            <div className ={style.paginado}>
                <Paginado 
                countriesPerPage={countriesPerPage}
                allCountries={allCountries.length}
                paginado = {paginado}
                currentPage={currentPage}/>
        </div>
    </div>
    )

}