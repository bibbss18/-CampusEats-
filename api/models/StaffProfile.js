import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

export const StaffProfile = sequelize.define('StaffProfile', {
  staff_id: { type: DataTypes.STRING, unique: true },
  pin: { type: DataTypes.STRING },
  nume: { type: DataTypes.STRING }
});