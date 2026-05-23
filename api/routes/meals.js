import express from 'express';
import { Meal } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const meals = await Meal.findAll();
    res.json(meals);
});

// GET: O singură masă (Bifează 4/5 GET)
router.get('/:id', async (req, res) => {
    const meal = await Meal.findByPk(req.params.id);
    res.json(meal);
});

router.post('/', async (req, res) => {
    const meal = await Meal.create(req.body);
    res.status(201).json(meal);
});

// PUT: Update Meal (Bifează 4/5 PUT)
router.put('/:id', async (req, res) => {
    await Meal.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Masă actualizată.' });
});

// DELETE: Delete Meal (Bifează 1/2 DELETE)
router.delete('/:id', async (req, res) => {
    await Meal.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Masă ștearsă.' });
});

export default router;