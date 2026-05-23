import { sequelize } from '../database/db.js';
import { StudentProfile } from './StudentProfile.js';
import { StaffProfile } from './StaffProfile.js';
import { Meal } from './Meal.js';
import { Donation } from './Donation.js';
import { Log } from './Log.js';

StudentProfile.hasMany(Donation, { foreignKey: 'StudentId' });
Donation.belongsTo(StudentProfile, { foreignKey: 'StudentId' });

StudentProfile.hasMany(Log, { foreignKey: 'StudentId' });
Log.belongsTo(StudentProfile, { foreignKey: 'StudentId' });

export { sequelize, StudentProfile, StaffProfile, Meal, Donation, Log };