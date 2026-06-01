import bcrypt from 'bcryptjs';

export const register = async (data, model) => {
    const { firstName, lastName, email, password, confirmPassword } = data;

    if(!firstName || !lastName || !email || !password || !confirmPassword){
        throw new Error('Preencha todos os campos!');
    }
    
}