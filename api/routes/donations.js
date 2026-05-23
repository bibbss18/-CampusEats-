import express from 'express';
import { Donation, StudentProfile } from '../models/index.js';
import { broadcast } from '../index.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const donations = await Donation.findAll({ include: StudentProfile });
        res.json(donations);
    } catch (error) {
        res.status(500).json({ error: 'Eroare.' });
    }
});

router.post('/', async (req, res) => {
    try {
        const donation = await Donation.create(req.body);
        broadcast({ type: 'DONATION_UPDATE' });
        res.status(201).json(donation);
    } catch (error) {
        res.status(500).json({ error: 'Eroare.' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await Donation.update({ status: req.body.status }, { where: { id: req.params.id } });
        broadcast({ type: 'DONATION_UPDATE' });
        res.json({ message: 'Status actualizat.' });
    } catch (error) {
        res.status(500).json({ error: 'Eroare.' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Donation.destroy({ where: { id: req.params.id } });
        broadcast({ type: 'DONATION_UPDATE' });
        res.json({ message: 'Donație anulată.' });
    } catch (error) {
        res.status(500).json({ error: 'Eroare.' });
    }
});

export default router;