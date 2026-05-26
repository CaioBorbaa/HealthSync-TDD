import { DataTypes }  from'sequelize';
import sequelize  from '../../config/database.js';

const EducationalContent = sequelize.define('EducationalContent', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('DRAFT', 'ACTIVE'),
    defaultValue: 'DRAFT'
  }
},
{
  timestamps: true, 
  underscored: true
});

export default EducationalContent;