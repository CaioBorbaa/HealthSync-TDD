const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EducationalContent = sequelize.define('EducationalContent', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('DRAFT', 'ACTIVE'),
    defaultValue: 'DRAFT'
  }
});

module.exports = EducationalContent;