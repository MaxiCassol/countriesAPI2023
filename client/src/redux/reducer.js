import { 
    GET_ALL_COUNTRIES,
    GET_COUNTRY_DETAIL,
    GET_COUNTRY_BY_NAME,
    GET_COUNTRIES_QUERY,
    ADD_ACTIVITY,
    GET_ACTIVITIES,
    FILTER_BY_CONTINENTS,
    FILTER_BY_ACTIVITY,
    ORDER_COUNTRIES_NAME,
    ORDER_COUNTRIES_POP,
    } from "./actions";
    

const initialState= {    
    countries : [], 
    activities:[],
    allCountries : [], 
    allActivities: [], 
    detail:{},
    filterActivity:'All',
    filterContinent: 'All',
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return {
                ...state, 
                countries: action.payload,
                allCountries: action.payload
            };                
        
        case GET_COUNTRY_DETAIL:
            return{
                ...state,
                detail: action.payload
            };

        case GET_COUNTRY_BY_NAME:
            let country = action.payload === ''
            ? state.allCountries
            : state.countries.filter((event) => event.name.toLowerCase().includes(action.payload.toLowerCase()));
            return{
                ...state,
                countries: country
            };    
            
        case GET_COUNTRIES_QUERY:
            return {
                ...state,
                countries : action.payload
            };
        
        case ADD_ACTIVITY:
            return {...state};

        case GET_ACTIVITIES:
            return{
                ...state,
                activities:action.payload,
                allActivities: action.payload
            };

        case FILTER_BY_CONTINENTS:
            const allCountries = state.allCountries;
            let continentFiltered = action.payload === 'All' 
            ? allCountries 
            : allCountries.filter((e) => e.continent === action.payload)
                
            if(state.filterActivity !== 'All'){
                continentFiltered= continentFiltered.filter((e) => 
                e.Activities.find(a => a.name === state.filterActivity))
            }
            return{
                ...state,
                countries: continentFiltered,
                filterContinent : action.payload
            };

        case FILTER_BY_ACTIVITY:                   
            let countriesActivities = state.allCountries;

            if(state.filterContinent !== 'All'){
                countriesActivities = countriesActivities.filter((e) => e.continent === state.filterContinent)}

            const activityFiltered = action.payload === 'All'
            ? countriesActivities
            : countriesActivities.filter((e) => e.activities && e.activities.find(a => a.name === action.payload))
            
            return{
                ...state,
                countries:activityFiltered,
                filterActivity:action.payload 
            }

        case ORDER_COUNTRIES_NAME :
            let sortedArr = action.payload === 'asc'
            ? state.countries.sort(function (a, b) {
                if (a.name > b.name){
                    return 1
                }
                if (b.name > a.name){
                    return -1
                }
                return 0;
            })
            : state.countries.sort (function(a, b ) {
                if (a.name > b.name){
                    return -1;
                }
                if(b.name > a.name) {
                    return 1;
                }
                return 0
            })
            return {
                ...state,
                countries : sortedArr
            };        

                case ORDER_COUNTRIES_POP :
                    let sortedArrPop = action.payload === 'bigPop'
                    ? state.countries.sort(function(a, b) {
                        if(a.population > b.population){
                            return 1;
                        }
                        if (b.population > a.population){
                            return -1;
                        }
                        return 0;
                    })
                    : state.countries.sort(function(a, b) {
                        if(a.population > b.population){
                            return -1;
                        }
                        if (b.population > a.population){
                            return 1;
                        }
                        return 0;
                    })
                    return {
                        ...state,
                        countries : sortedArrPop
                    };

        default:
            return {...state};
    }
}

export default rootReducer;