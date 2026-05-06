const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const HealthMeasurement = sequelize.define('HealthMeasurement', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  value_1: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  value_2: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true // Opcional (ex: para pressão diastólica)
  },
  measured_at: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isNotFuture(value) {
        if (new Date(value) > new Date()) {
          throw new Error('A data da medição não pode ser no futuro.');
        }
      }
    }
  },
  notes: {
    type: DataTypes.TEXT
  }
});

module.exports = HealthMeasurement;