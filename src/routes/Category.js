const express = require('express');
const { Category } = require('../models/Category');
const router = express.Router();

// fetched category by ID
router.get('/:id', async (req, res) => {
    const fetchedCategory = await Category.findByPk(req.params.id, {
        attributes: ['name', 'description']
    });
    try {
        res.send(fetchedCategory.toJSON());
    } catch (err) {
        res.send(err);
    }
});

// fetched all categories
router.get('/', async (req, res) => {
    const fetchedCategories = await Category.findAll({
        attributes: ['name', 'description']
    });
    try {
        const fetchedCategoriesJSON = fetchedCategories.map(categorie => categorie.toJSON());
        res.send(fetchedCategoriesJSON);
    } catch (err) {
        res.send(err);
    }
});

// create new categorie
router.post('/', async (req, res) => {
    const newCategory = await Category.create({name: req.body.name, description: req.body.description });
    try {
        res.send(newCategory.toJSON());
    } catch (err) {
        res.send(err);
    }
});

// delete category by ID 
router.delete('/:id', async(req, res) => {
    await Category.destroy({ 
        where: {
            id: req.params.id
        }
    });
    try {
        res.send(`Deleted category which has id ${req.params.id}`);
    } catch (err) {
        res.send(err);
    }
});

// delete all categories
router.delete('/', async (req, res) => {
    await Category.destroy({
        truncate: true
    });
    try {
        res.send('Deleted all categories');
    } catch(err) {
        res.send(err);
    }
});

module.exports = { categorieRouter : router };