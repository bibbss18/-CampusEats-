import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

export const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('student', 'staff'), defaultValue: 'student' }
});