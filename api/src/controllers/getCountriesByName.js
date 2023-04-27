const axios = require("axios");
const { Op, sequelize } = require('sequelize');
const { Country } = require('../db.js')

async function getCountryByName(req, res) {
    const {name} = req.query;

    try {
        // console.log("s");
        const pais = await Country.findAll({
            where: {
            name: {[Op.iLike]: `%${name}%`}
            }
        })
        
        res.status(200).json(pais)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getCountryByName;
