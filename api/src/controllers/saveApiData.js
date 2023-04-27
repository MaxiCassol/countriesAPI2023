const axios = require('axios');
const {Country} = require('../db.js');

const getApiData = async() => {
    const apiData = await axios(`https://restcountries.com/v3/all`);
    const paises = apiData.data.map(el => {
        return({
            id:el.cca3,
            name: el.name.common,
            flag: el.flags[1], 
            continent: el.continents[0],
            capital: el.capital?el.capital[0]:el.name.common,
            subregion: el.subregion,
            population: el.population,
        }) 
    })
    return paises; 
}

const saveApiData = async () => {
    try {
        const countries= await Country.findAll();
        
        if(countries.length===0){    
            const allCountries = await getApiData();
            // console.log(allCountries);
            await Country.bulkCreate(allCountries);
            const bd = await Country.findAll();
            // console.log(bd);
            
        }
    } catch (error) {
        return {error:error.message}
    }          
}        


module.exports = saveApiData;
