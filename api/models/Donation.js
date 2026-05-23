import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

export const Donation = sequelize.define('Donation', {
  meal_type: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, defaultValue: 'pending' }
});