import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

export const StaffProfile = sequelize.define('StaffProfile', {
  access_level: { type: DataTypes.STRING }
});