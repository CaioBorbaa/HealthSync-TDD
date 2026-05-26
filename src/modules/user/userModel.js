import { DataTypes }  from 'sequelize';
import sequelize  from'../../config/database.js'; // Ajuste o caminho do seu config

import { underscoredIf } from'sequelize/lib/utils';

const User = sequelize.define('User', {
  FullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  password_hash: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('USER', 'ADMIN'),
    defaultValue: 'USER'
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
},
{
  timestamps: true, 
  underscored: true
});

export default User;