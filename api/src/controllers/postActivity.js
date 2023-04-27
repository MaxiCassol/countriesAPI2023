const axios = require("axios");
const { Activity, Country } = require('../db.js')

async function postActivity(req, res) {
    const {name, difficulty, duration, season, countries} = req.body;
    try {
        const [actividad, created] = await Activity.findOrCreate({
            where: {
                name:name
            }, 
            defaults: {
                name: name, 
                difficulty: difficulty,
                duration: duration,
                season: season,
                countries: countries
            }})

        const selectCountries = await Country.findAll({
            where: {
                name: countries
            }
        });
        // console.log(selectCountries);
        aux = actividad.addCountry(selectCountries)
        res.status(200).json(aux)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = postActivity;