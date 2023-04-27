const axios = require("axios");
const { Country } = require('../db.js');
const { Activity } = require('../db.js')

async function getCountryById(req, res) {
    const {id} = req.params;

    try {
        const pais = await Country.findOne({
            where: {
                id: id.toUpperCase()
            },
            include :[{
                model: Activity,
                    attributes: ['name', 'difficulty', 'duration', 'season'],
                    through:{attributes:[]}
            }]
        })
        if (pais) {
            res.status(200).json(pais)
        } else {
            return res.status(404).send('Country not found')
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = getCountryById;

