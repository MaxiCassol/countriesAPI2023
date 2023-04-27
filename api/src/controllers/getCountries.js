const { Country } = require('../db.js');
const { Activity } = require('../db.js')

const getAllCountries = async (req, res) => {
    try {
        const allCountries = await Country.findAll({
            include :[{
                model: Activity,
                attributes: ['name', 'difficulty', 'duration', 'season'],
                through:{ attributes:[] },
            }],
        });
        res.status(200).json(allCountries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getAllCountries