const express = require('express');
const router = express.Router();
const { Exercise } = require('../models/Exercise');

// PRIVET ACCESS - X

// Fetched all exercises 
router.get('/', async (req, res) => {
    const fetchedAllExercises = await Exercise.findAll();
    try {
        exercisesJSON = fetchedAllExercises.map(exercise => exercise.toJSON());
        res.send(exercisesJSON);
    } catch (err) {
        res.send(err);
    }
});

// Fetched Exercise by primary key
router.get('/:exerciseID', async (req, res) => {
    const exerciseID = req.params.exerciseID; 
    console.log(exerciseID);
    const fetchedExercise = await Exercise.findByPk(exerciseID);
    try {
        res.send(fetchedExercise.toJSON());
    } catch(err) {
        res.send(err);
    }
});

// Add new exercise
router.post('/', async (req, res) => {
    const exercise = await Exercise.create({name: req.body.name, description: req.body.description}); 
    try {
        res.send(exercise.toJSON());
    } catch(err) {
        res.send(err);
    }
});

module.exports = { exerciseRouter: router }


// router.put('/:exerciseID', updateExercise)
