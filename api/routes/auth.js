import express from 'express';
import jwt from 'jsonwebtoken';
import { StudentProfile, StaffProfile } from '../models/index.js';

const router = express.Router();

const JWT_SECRET = 'campuseats_secret_key';
const JWT_REFRESH_SECRET = 'campuseats_refresh_secret_key';

router.post('/login', async (req, res) => {
    const { username, pin } = req.body;
    try {
        const student = await StudentProfile.findOne({ where: { student_id: username, pin } });
        if (student) {
            const payload = { id: student.id, username: student.student_id, nume: student.nume, tipbon: student.tipbon, role: 'student' };
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
            const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
            return res.json({ ...payload, token, refreshToken });
        }

        const staff = await StaffProfile.findOne({ where: { staff_id: username, pin } });
        if (staff) {
            const payload = { id: staff.id, username: staff.staff_id, nume: staff.nume, role: 'staff' };
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
            const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
            return res.json({ ...payload, token, refreshToken });
        }

        return res.status(401).json({ error: 'Date de autentificare invalide.' });
    } catch (error) {
        res.status(500).json({ error: 'Eroare la server.' });
    }
});

router.post('/refresh', (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ error: 'Refresh token lipsă.' });

    try {
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        const { iat, exp, ...payload } = decoded;
        const newToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
        res.json({ token: newToken });
    } catch (error) {
        res.status(403).json({ error: 'Refresh token invalid.' });
    }
});

router.get('/users', async (req, res) => {
    try {
        const students = await StudentProfile.findAll();
        const staff = await StaffProfile.findAll();
        res.json({ students, staff });
    } catch (error) {
        res.status(500).json({ error: 'Eroare.' });
    }
});

export default router;