import bcrypt from 'bcryptjs';
import { where } from 'sequelize';

export const register = async (data, model) => {
    const { firstName, lastName, email, password, confirmPassword } = data;

    if(!firstName || !lastName || !email || !password || !confirmPassword){
        throw new Error('Preencha todos os campos do formulário');
    }

    const regexLastName = /^[A-Za-zÀ-ÿ\s]+$/;
    const regexFirstNameName = /^[A-Za-zÀ-ÿ]+$/;

    if(!(regexFirstNameName.test(firstName))){
        throw new Error('Não pode ter caracteres especias no primeiro nome');
    }

    if(!(regexLastName.test(lastName))){
        throw new Error('Não pode ter caracteres especiais no segundo nome');
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!(regexEmail.test(email))){
        throw new Error('É preciso que o E-mail seja valido!');
    }

    const emailEncontrado = await model.findOne({
        where: {email: email}
    });

    if(emailEncontrado){
        throw new Error('Esse email já está cadastrado');
    }

    if(password.length < 8){
        throw new Error('A senha deve ter pelo menos 8 caracteres');
    }

    if(confirmPassword !== password ){
        throw new Error('A senha não coincide com a confirmação');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const qtde_users = await model.count();

    let novoUsuario;
    
    if(qtde_users < 1){
        novoUsuario = await model.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password_hash: password,
            admin: 'ADMIN'
        });
    }else{
        novoUsuario = await model.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password_hash: password,
            admin: 'USER'
        });
    }

    return novoUsuario;

    
}