import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getCountriesDetail} from '../../redux/actions';
import style from './Detail.module.css';

const CountryDetail = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;
    const country = useSelector((state) => state.detail)


    useEffect(() => {
        dispatch(getCountriesDetail(id))
    }, [dispatch, id]);

    return (
        <div className ={style.divG}>
            <div>
                <div>
                    <h2>Information: </h2>
                    {
                        country ?
                        <div > 
                            <img src ={country.flag} alt ='imagen'></img>
                            <h1>{country.name}</h1>
                            <div className ={style.Details}>
                                <h4>Capital : {country.capital}</h4>
                                <h4>Id: {country.id}</h4>
                                <h4>Continent : {country.continent}</h4>
                                <h4>Sub Región : {country.subregion}</h4>
                                <h4>Población : {country.population} habitantes</h4>
                            </div>
                        </div> : <p>Loading...</p>
                    }
                </div>

                <div className ={style.activityTitle} >
                    <h2 >Actividades:</h2>
                    <div className ={style.activities}>
                        {
                        country.activities && country.activities.length ? 
                            country.activities.map(e => {
                            return (
                                <div className ={style.activity}>
                                    <h2>{e.name}</h2>
                                    <p>Dificulty: {e.difficulty}</p>
                                    <p>Duration: {e.duration}</p>
                                    <p>Season: {e.season}</p>
                                </div>
                            )
                        })
                        : <p className ={style.Details}> Pais sin actividades </p>
                    }
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default CountryDetail;