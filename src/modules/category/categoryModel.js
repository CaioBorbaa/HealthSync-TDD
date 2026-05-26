import Sequelize from "sequelize";
const { DataTypes } = Sequelize;

import sequelize from '../../config/database.js'

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT
  }
}, { timestamps: false });

export default Category;