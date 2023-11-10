const express = require('express');
const router = express.Router();
const { Exercise } = require('../models/Exercise');

// router.get('/', getExercises);
router.get('/:exerciseID', async (req, res) => {
    const exerciseID = req.params.exerciseID; 
    console.log(exerciseID);
    const fetchedExercise = await Exercise.findByPk(exerciseID);
    try {
        res.send(fetchedExercise.toJSON());
    }
    catch(err) {
        res.send(err);
    }
});

router.post('/', async (req, res) => {
    const exercise = await Exercise.create({name: req.body.name, description: req.body.description}); 
    try {
        res.send(exercise.toJSON());
    }
    catch(err) {
        res.send(err);
    }
});

module.exports = { exerciseRouter: router }

// router.delete('/:exerciseID', deleteExercise);

// router.put('/:exerciseID', updateExercise)
