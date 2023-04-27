const { Activity } = require('../db.js')

const getActivity = async (req, res) => {
    try {
        const allActivity = await Activity.findAll();
        res.status(200).json(allActivity);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getActivity