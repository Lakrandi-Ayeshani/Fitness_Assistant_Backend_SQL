const express = require('express');
const router = express.Router();
const { Exercise } = require('../models/Exercise');

// PRIVET ACCESS - X

// Fetched Exercise by primary key
router.get('/:exerciseID', async (req, res) => {
    const exerciseID = req.params.exerciseID; 
    const fetchedExercise = await Exercise.findByPk(exerciseID, 
        { include:  'Category', paranoid: false  }
    );
    try {
        res.send(fetchedExercise.toJSON());
    } catch(err) {
        res.send(err);
    }
});

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

// Add new exercise
router.post('/', async (req, res) => {
    const exercise = await Exercise.create({name: req.body.name, description: req.body.description, cid: req.body.cid}); 
    try {
        res.send(exercise.toJSON());
    } catch(err) {
        res.send(err);
    }
});

// Delete exercise by ID
router.delete('/:exerciseID', async (req, res) => {
    const deleteExerciseID = req.params.exerciseID;
    await Exercise.destroy({
        where: {
            id: deleteExerciseID
        }
    });
    try {
        res.send(`Delete exercise with id ${deleteExerciseID}`)
    } catch (err) {
        res.send(err);
    }
});

// Delete all exercises
router.delete("/", async(req, res) => {
    await Exercise.destroy({
        truncate: true
    })
    try {
        res.send("deleted all exercises");
    } catch (err) {
        res.send(err);
    }
});

// update category


module.exports = { exerciseRouter: router }


// router.put('/:exerciseID', updateExercise)
