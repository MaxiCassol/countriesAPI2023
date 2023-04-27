const { Activity } = require('../db.js');

const deleteActivity = async (req, res) => {
    const { id } = req.params;

    try {
        const activity = await Activity.findByPk(id);
        if (!activity) {
        return res.status(404).json({ message: 'Activity not found' });
    }

    await activity.destroy();
    res.status(200).json({ message: 'Activity deleted successfully' });
    } catch (error) {
    res.status(500).json({ error: error.message });
    }
};

module.exports = deleteActivity;
