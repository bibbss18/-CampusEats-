import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

export const Meal = sequelize.define('Meal', {
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  available_date: { type: DataTypes.DATEONLY }
});