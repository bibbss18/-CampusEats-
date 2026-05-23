import { sequelize } from '../database/db.js'; // Importăm instanța de conexiune
import { User } from './User.js';
import { StudentProfile } from './StudentProfile.js';
import { StaffProfile } from './StaffProfile.js';
import { Meal } from './Meal.js';
import { Donation } from './Donation.js';
import { Log } from './Log.js';

// Definim Relațiile 1:1
User.hasOne(StudentProfile, { foreignKey: 'UserId', onDelete: 'CASCADE' });
StudentProfile.belongsTo(User, { foreignKey: 'UserId' });

User.hasOne(StaffProfile, { foreignKey: 'UserId', onDelete: 'CASCADE' });
StaffProfile.belongsTo(User, { foreignKey: 'UserId' });

// Definim Relațiile N:1 (Donații)
User.hasMany(Donation, { foreignKey: 'UserId' });
Donation.belongsTo(User, { foreignKey: 'UserId' });

// Logs
User.hasMany(Log, { foreignKey: 'UserId' });
Log.belongsTo(User, { foreignKey: 'UserId' });

// Exportăm totul, inclusiv instanța sequelize pentru a fi sincronizată în index.js
export { sequelize, User, StudentProfile, StaffProfile, Meal, Donation, Log };