import { DataTypes } from 'sequelize';
import sequelize  from'../../config/database.js';

const Reminder = sequelize.define('Reminder', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.STRING
  },
  frequency_hours: {
    type: DataTypes.INTEGER
  },
  next_occurrence: {
    type: DataTypes.DATE,
    allowNull: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
},
{
  timestamps: true, 
  underscored: true
});

export default Reminder;