const express = require('express');
const { Categorie } = require('../models/Categorie');
const router = express.Router();

// feched all categories
router.get('/', async (req, res) => {
    const fetchedCategories = await Categorie.findAll();
    try {
        const fetchedCategoriesJSON = fetchedCategories.map(categorie => categorie.toJSON());
        res.send(fetchedCategoriesJSON);
    } catch (err) {
        res.send(err);
    }
});

// create new categorie
router.post('/', async (req, res) => {
    const newCategorie = await Categorie.create({name: req.body.name, description: req.body.description });
    try {
        res.send(newCategorie.toJSON());
    } catch (err) {
        res.send(err);
    }
})

module.exports = { categorieRouter : router };