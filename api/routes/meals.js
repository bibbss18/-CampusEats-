import express from 'express';
import { Meal, Log } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const meals = await Meal.findAll();
    res.json(meals);
});

router.get('/logs', async (req, res) => {
    try {
        const { user_id } = req.query;
        const logs = await Log.findAll({ where: { UserId: user_id } });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: 'Eroare la preluarea logurilor.' });
    }
});

router.get('/:id', async (req, res) => {
    const meal = await Meal.findByPk(req.params.id);
    res.json(meal);
});

router.post('/', async (req, res) => {
    const meal = await Meal.create(req.body);
    res.status(201).json(meal);
});

router.post('/scan', async (req, res) => {
    try {
        const { student_id, meal_type } = req.body;
        await Log.create({
            action: 'scan',
            details: `Masă scanată: ${meal_type}`,
            UserId: student_id
        });
        res.json({ message: 'Scanare înregistrată.' });
    } catch (error) {
        res.status(500).json({ error: 'Eroare la scanare.' });
    }
});

router.put('/:id', async (req, res) => {
    await Meal.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Masă actualizată.' });
});

router.delete('/:id', async (req, res) => {
    await Meal.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Masă ștearsă.' });
});

export default router;