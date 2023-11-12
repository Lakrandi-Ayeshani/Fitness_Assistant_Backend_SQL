const express = require('express');
const { Categorie } = require('../models/Categorie');
const router = express.Router();

// fteched all categories
router.get('/', async (req, res) => {
    const fetchedCategories = await Categorie.findAll();
    try {
        const fetchedCategoriesJSON = fetchedCategories.map(categorie => categorie.toJSON());
        res.send(fetchedCategoriesJSON);
    } catch (err) {
        res.send(err);
    }
});

module.exports = { categorieRouter : router };