import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

export const Log = sequelize.define('Log', {
  student_id: { type: DataTypes.INTEGER },
  meal_type: { type: DataTypes.STRING }
});