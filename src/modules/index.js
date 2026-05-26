// src/models/index.js
import sequelize from '../config/database.js'; // A conexão principal

// 1. Importa todos os modelos mapeados na estrutura de pastas
import Category from '../modules/category/categoryModel.js';
import Education from '../modules/education/EducationModel.js';
import Remedio from '../modules/Remedios/remedioModel.js';
import Reminder from '../modules/reminder/reminderModel.js';
import User from '../modules/user/userModel.js';

// 2. Definição das Relações (Associações)

// Relação: Usuário e Remédios (1:N)
// Um usuário pode cadastrar vários remédios
User.hasMany(Remedio, {
    foreignKey: 'user_id',
    as: 'remedios'
});
Remedio.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

// Relação: Usuário e Lembretes (1:N)
// Um usuário pode ter vários lembretes associados a ele
User.hasMany(Reminder, {
    foreignKey: 'user_id',
    as: 'reminders'
});
Reminder.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

// Relação: Remédio e Lembretes (1:N)
// Um remédio pode ter vários lembretes (ex: tomar de 8h em 8h, 12h em 12h)
Remedio.hasMany(Reminder, {
    foreignKey: 'remedio_id',
    as: 'reminders'
});
Reminder.belongsTo(Remedio, {
    foreignKey: 'remedio_id',
    as: 'remedio'
});

// Relação: Categoria e Remédios / Educação (1:N)
// Assumindo que as categorias organizam os tipos de remédios ou os materiais educativos
Category.hasMany(Remedio, {
    foreignKey: 'category_id',
    as: 'remedios'
});
Remedio.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category'
});

Category.hasMany(Education, {
    foreignKey: 'category_id',
    as: 'education_materials'
});
Education.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category'
});

// 3. Exporta a instância do Sequelize e todos os modelos associados
export { 
    sequelize, 
    User, 
    Remedio, 
    Reminder, 
    Category, 
    Education 
};