import style from "./Form.module.css";
import { React, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getCountries, postActivity} from '../../redux/actions';
import validate from "./validations"


const CreateActivity = () => {
    const dispatch = useDispatch();
    const countries = useSelector((state) => state.countries);
    // const activities = useSelector((state) => state.allActivities)
    const history = useHistory(); // hook para redirigir a home
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: []
    });

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])


    const handleChange = (event) =>{
        setInput({
            ...input,
            [event.target.name] : event.target.value
        });
        setErrors(
            validate({
                ...input,
                [event.target.name] : event.target.value
            })
        );
        // console.log(input)
    }


    const handleSelect = (event) => {
        setInput((estado) => {
        if(event.target.name === 'countries'){
            if(!input.countries.includes(event.target.value)){
                return {
                    ...estado, 
                    countries: [...estado.countries, event.target.value]
                };
            } else {
                alert('Can not add a country twice');
                return{
                    ...estado,
                    countries: [...estado.countries]
                }
            }
        } else {
            return {
                ...estado,
                [event.target.name] : event.target.value
            }
        }
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if(!input.name || !input.difficulty || !input.duration || !input.season || !input.countries){
            return alert ('Please complete all the form inputs')
        } 
        const allActivities = await fetch('http://localhost:3001/activities').then((res) => res.json());
        const activityExist = allActivities.some((activity) => activity.name === input.name)
        
        if(activityExist){
            return alert('This activity already exist')
        }
        
        dispatch(postActivity(input));
        alert ('Activity added');
        setInput({
            name: "",
            difficulty : "",
            duration:"",
            season : "",
            countries :[]
        })
        history.push("/home")
    }

    const handleDelete = (event) => {
        setInput({
            ...input,
            countries : input.countries.filter((el) => el !== event)
        })
    }
    
    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);


    return (
        <div className = {style.divGeneral}>
            <div className = {style.form}>
                <h2>Add Activity</h2>
                <form onSubmit = {handleSubmit}>
                    <div>               
                        <label className={style.campos}>Name: </label>
                        <input 
                        className={style.inputs} 
                        type="text"
                        placeholder='Write a name...'
                        value={input.name} 
                        name ="name" 
                        onChange={handleChange}>
                        </input>
                        {errors.name && <p className={style.errors}>{errors.name}</p>}
                    </div> 

                    <div>
                        <label className={style.campos}>Country</label>
                        <select 
                        className={style.inputs} 
                        name="countries"
                        id="countries"
                        onChange={handleSelect}>
                        <option value="" disabled selected>Selecct a country...</option>
                        {countries.sort((a, b) => a.name.localeCompare(b.name)).map((el) => (
                            <option value={el.name}>{el.name}</option>
                        ))}
                        
                        </select>
                        {errors.countries && <p className ={style.errors}>{errors.countries}</p>}

                    </div>

                    <div>
                        <label className ={style.campos}>Seasson: </label>
                        <select
                        className = {style.inputs}
                        name = "season"
                        id = "season"
                        placeholder='Selecct a seasson...'
                        value={input.season}
                        onChange = {handleSelect}>
                            <option value = "" disabled selected>Select a seasson...</option>
                            <option value = {"Summer"}>Summer</option>
                            <option value = {"Winter"}>Winter</option>
                            <option value = {"Autumn"}>Autumn</option>
                            <option value = {"Spring"}>Spring</option>
                        </select>
                        {errors.season && <p className={style.errors}>{errors.season}</p>}
                    </div>

                    <div>
                        <label className = {style.campos}>Dificulty: 1 </label>
                        <input
                        className={style.inputs}
                        type = "range"
                        min="1" 
                        max="5"
                        value={input.difficulty}
                        name="difficulty"
                        placeholder='Selecct a dificulty...'
                        onChange={handleChange}>
                        </input>
                        {errors.difficulty && <p className={style.errors}>{errors.difficulty}</p>}5
                    </div>

                    <div>
                        <label className={style.campos}>Duration: </label>
                        <input
                        className={style.inputs}
                        type = "number"
                        value = {input.duration}
                        name = "duration"
                        placeholder='Select a duration...'
                        onChange={handleChange}>
                        </input>
                        <label className={style.campos}> horas</label>
                        {errors.duration && <p className={style.errors}>{errors.duration}</p>}
                    </div>
                    <button
                        className ={style.buttonSubmit}
                        type= "submit"
                    >ADD</button>
                </form>
            </div>

            {input.countries.map((el)=> (
                <div className={style.divFlag}>
                    <p>
                    <img 
                    src={(countries.find(c => c.name === el)).flag} 
                    className={style.flag} 
                    alt='Img not found'/>

                    <hr></hr>
                    {el}
                    </p>
                    
                    <hr></hr>

                    <button 
                    className={style.buttonDelete}
                    onClick= {()=> handleDelete(el)}> CLEAR {''}
                    </button>
                </div>
            ))}
        </div>
    );
}

export default CreateActivity;



