const express = require('express');
const { Activity } = require('../models/Activity');
const router = express.Router();

router.get('/', async(req, res) => {
    const fetchedActivities = await Activity.findAll();
    try {
        activitiesToJSON = fetchedActivities.map(activity => activity.toJSON());
        res.send(activitiesToJSON);
    } catch (err) {
        res.send(err);
    }
});

module.exports = { activityRouter : router };