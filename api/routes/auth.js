import express from 'express';
import { StudentProfile, StaffProfile } from '../models/index.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, pin } = req.body;
    try {
        const student = await StudentProfile.findOne({ where: { student_id: username, pin } });
        if (student) {
            return res.json({ id: student.id, username: student.student_id, nume: student.nume, tipbon: student.tipbon, role: 'student' });
        }

        const staff = await StaffProfile.findOne({ where: { staff_id: username, pin } });
        if (staff) {
            return res.json({ id: staff.id, username: staff.staff_id, nume: staff.nume, role: 'staff' });
        }

        return res.status(401).json({ error: 'Date de autentificare invalide.' });
    } catch (error) {
        res.status(500).json({ error: 'Eroare la server.' });
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