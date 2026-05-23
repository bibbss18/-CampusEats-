import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

export const StudentProfile = sequelize.define('StudentProfile', {
  fullname: { type: DataTypes.STRING },
  badge_number: { type: DataTypes.STRING, unique: true },
  meal_ticket_type: { type: DataTypes.STRING } 
});