import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

export const Log = sequelize.define('Log', {
  action: { type: DataTypes.STRING },
  details: { type: DataTypes.TEXT },
  StudentId: { type: DataTypes.INTEGER }
});