import express from 'express';
import { Donation, User } from '../models/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const donations = await Donation.findAll({ include: User });
    res.json(donations);
});

// POST: Creează donație (Bifează 5/5 POST - GATA!)
router.post('/', async (req, res) => {
    const donation = await Donation.create(req.body);
    res.status(201).json(donation);
});

// PUT: Update status (Bifează 5/5 PUT - GATA!)
router.put('/:id', async (req, res) => {
    await Donation.update({ status: req.body.status }, { where: { id: req.params.id } });
    res.json({ message: 'Status actualizat.' });
});

// DELETE: Anulare donație (Bifează 2/2 DELETE - GATA!)
router.delete('/:id', async (req, res) => {
    await Donation.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Donație anulată.' });
});

export default router;