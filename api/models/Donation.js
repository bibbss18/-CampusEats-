import { DataTypes } from 'sequelize';
import { sequelize } from '../database/db.js';

export const Donation = sequelize.define('Donation', {
  donor_id: { type: DataTypes.INTEGER },
  receiver_id: { type: DataTypes.INTEGER },
  day_index: { type: DataTypes.INTEGER },
  meal_type: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, defaultValue: 'pending' },
  thank_you_note: { type: DataTypes.STRING }
});