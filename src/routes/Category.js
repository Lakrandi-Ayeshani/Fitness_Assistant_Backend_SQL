const express = require('express');
const router = express.Router();
const { Category } = require('../models/Category');
const { Exercise } = require('../models/Exercise');
const { Activity } = require('../models/Activity');

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
    const newCategory = await Category.create({
        name: req.body.name, 
        description: req.body.description 
    });
    await Activity.create({ 
        resourceType: 'Category', 
        resourceID: newCategory.id, 
        activityType: 'create', 
        newValue: newCategory 
    });
    try {
        res.send(newCategory.toJSON());
    } catch (err) {
        res.send(err);
    }
});

// delete category by ID 
router.delete('/:id', async(req, res) => {
    const fetchedCategory = await Category.findByPk(req.params.id);
    await Category.destroy({ 
        where: {
            id: req.params.id
        }
    }); 
    await Activity.create({
        resourceType: 'Category', 
        resourceID: req.params.id, 
        activityType: 'delete by Id', 
        oldValue: fetchedCategory, 
    });
    try{
        res.send(`Deleted category which has id ${req.params.id}`);
    } catch (err) {
        res.send(err);
    }    
});

// delete all categories
router.delete('/', async (req, res) => {
    fetchedCategories = await Category.findAll();
    fetchedCategoriesJSON = fetchedCategories.map(category => category.toJSON());
    await Category.destroy({
        truncate: true
    });
    await Activity.create({
        resourceType: 'Category', 
        resourceID: req.params.id, 
        activityType: 'delete all', 
        oldValue: fetchedCategoriesJSON, 
    });
    try {
        res.send('Deleted all categories');
    } catch(err) {
        res.send(err);
    }
});

// update category
router.put('/:categoryID', async(req, res) => {
    const updateCategory = await Category.update({name: req.body.name, description: req.body.description}, {
        where: {
            id: req.params.categoryID
        },
    });
    try {
        res.send(updateCategory.toJSON());
    } catch (err) {
        res.send(err);
    }
});

// fetch all exercise associate with category
router.get('/:categoryID/exercises', async(req, res) => {
    const fetchedCategory = await Category.findByPk(req.params.categoryID, 
        { include: Exercise }
    );
    try {
        res.send(fetchedCategory.toJSON().Exercises)
    } catch (err) {
        res.send(err);
    }
});

module.exports = { categorieRouter : router };