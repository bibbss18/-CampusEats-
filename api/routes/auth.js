import express from 'express';
import { sequelize } from '../database/db.js';
import { User, StudentProfile } from '../models/index.js';

const router = express.Router();

// 1. POST: Register
router.post('/register', async (req, res) => {
    const { email, password, role, fullname, badge_number } = req.body;
    const t = await sequelize.transaction();

    try {
        const newUser = await User.create({
            email,
            password,
            role: role || 'student'
        }, { transaction: t });

        if (role === 'student' || !role) {
            await StudentProfile.create({
                fullname,
                badge_number,
                UserId: newUser.id
            }, { transaction: t });
        }

        await t.commit();
        res.status(201).json({ message: 'Utilizator creat cu succes!' });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: 'Eroare la înregistrare.' });
    }
});

// 2. POST: Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Date de autentificare invalide.' });
        }
        res.json({ id: user.id, email: user.email, role: user.role });
    } catch (error) {
        res.status(500).json({ error: 'Eroare la server.' });
    }
});

// 3. GET: Toți utilizatorii
router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll({ include: StudentProfile });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Eroare la preluarea utilizatorilor.' });
    }
});

// 4. GET: Profil specific după ID
router.get('/profile/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { include: StudentProfile });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Profil negăsit.' });
    }
});

// 5. PUT: Actualizare profil
router.put('/update/:id', async (req, res) => {
    try {
        const { fullname } = req.body;
        await StudentProfile.update({ fullname }, { where: { UserId: req.params.id } });
        res.json({ message: 'Profil actualizat!' });
    } catch (error) {
        res.status(500).json({ error: 'Eroare la actualizarea profilului.' });
    }
});

export default router;