import { DataTypes }  from 'sequelize';
import sequelize  from'../../config/database.js'; 
import { underscoredIf } from 'sequelize/lib/utils';

const remedio = sequelize.define('remedio', {
    Name: {
        type: DataTypes.STRING,
        allowNull: false

    },
    categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},
{
    timestamps: true, 
    underscored: true
});

export default remedio;