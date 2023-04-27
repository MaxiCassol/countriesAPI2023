import axios from "axios";

export const GET_ALL_COUNTRIES = 'GET_ALL_COUNTRIES';
export const GET_COUNTRY_DETAIL = 'GET_COUNTRY_DETAIL';
export const GET_COUNTRY_BY_NAME = 'GET_COUNTRY_BY_NAME';
export const GET_COUNTRIES_QUERY = 'GET_COUNTRIES_QUERY';
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const FILTER_BY_CONTINENTS = 'FILTER_BY_CONTINENTS';
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY';
export const ORDER_COUNTRIES_NAME = 'ORDER_COUNTRIES_NAME';
export const ORDER_COUNTRIES_POP = 'ORDER_COUNTRIES_POP';
export const DELETE_ACTIVITY = 'DELETE_ACTIVITY';

export const getCountries = () => {
    return async function (dispatch) {
        let info = await axios.get('http://localhost:3001/countries');
        return dispatch({
            type: GET_ALL_COUNTRIES,
            payload: info.data
        })
    }
};

export const getCountriesDetail = (id) => {
    return async function(dispatch){
        try {
            let info = await axios.get(`http://localhost:3001/countries/${id}`)
            return dispatch ({
                type: GET_COUNTRY_DETAIL,
                payload: info.data
            })
        } catch (error) {
            return {error: error.message}
        }
    }
};

export const getCountryByName = (name) =>{
    return{
        type: GET_COUNTRY_BY_NAME,
        payload: name
    }
};

export const getCountriesQuery = (name) => {
    return async function (dispatch) {
        try {
            let info = await axios.get 
            ('http://localhost:3001/countries?name=' + name.charAt(0).toUpperCase() + name.slice(1));
            return dispatch ({
                type: GET_COUNTRIES_QUERY,
                payload: info.data
            })
        } catch (error) {
            return {error: error.message}
        }
    };
}

export const postActivity =(payload) => {
    const activity= {
        name:payload.name,
        difficulty:payload.difficulty,
        duration:payload.duration,
        season:payload.season,
        countries:payload.countries
    };
    try {
        return async function(dispatch){
            await axios.post('http://localhost:3001/activities', activity)
            return dispatch({
                type:ADD_ACTIVITY,
            })
        }
    } catch (error) {
        return {error: error.message}
    }
};

export const getActivities = () => {
    return (dispatch) => {
        try {
            axios.get("http://localhost:3001/activities")
            .then ((info) => {
                return dispatch ({
                    type: GET_ACTIVITIES,
                    payload:info.data
                })
            })
        } catch (error) {
            return {error: error.message}
        }
    }
};



export const filterByContinents = (payload) =>{
    return{
        type: FILTER_BY_CONTINENTS,
        payload
    }
};

export const filterByActivity = (payload) => {
    return{
        type:FILTER_BY_ACTIVITY,
        payload
    }
}

export const orderByName = (payload) => {
    return{
        type: ORDER_COUNTRIES_NAME,
        payload
    }
};

export const orderByPopulation = (payload) => {
    return {
        type : ORDER_COUNTRIES_POP,
        payload
    }
}





