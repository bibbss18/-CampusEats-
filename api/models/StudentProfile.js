import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

export const StudentProfile = sequelize.define('StudentProfile', {
  student_id: { type: DataTypes.STRING, unique: true },
  pin: { type: DataTypes.STRING },
  nume: { type: DataTypes.STRING },
  tipbon: { type: DataTypes.STRING },
  specializare: { type: DataTypes.STRING },
  an: { type: DataTypes.INTEGER }
});