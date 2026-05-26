import { DataTypes }  from 'sequelize';
import sequelize  from'../../config/database.js'; // Ajuste o caminho do seu config
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