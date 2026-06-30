import { assert, expect, should } from 'chai';
import { describe, it, expect, beforeEach } from 'vitest';
import  * as userService from '../user.service.js';

// Inicializa a interface 'should' do Chai
should(); 

describe('User Service - Registro do usuário', () => {
  let mockUserModel;
  beforeEach(() => {
    mockUserModel = {
      findOne: vi.fn(),
      create: vi.fn(),
      count: vi.fn()
    };
  });

  it('Red -  Irá retornar um erro se houver falta de dados', async () => {
    const data = {
      firstName: 'caio abobrá',
      email: 'PauloManseira@gmail.com'
    };
    await expect(userService.register(data, mockUserModel))
    .rejects
    .toThrow('Preencha todos os campos do formulário');
  });
  
  it('Red - Irá retornar erro se houver espaços entre o primeiro nome', async () =>{
    const data = {
      firstName: 'Ca io',
      lastName: 'ThiagoBobô',
      email: 'Borbaa1004@gmail.com',
      password: '12345678',
      confirmPassword: '87654321'
    };
    await expect(userService.register(data, mockUserModel))
    .rejects
    .toThrow('Não pode ter caracteres especias no primeiro nome');
  });

  it('Red - Irá retornar erro se houver caracteres especiais entre o primeiro nome', async () =>{
    const data = {
      firstName: 'Caio@#Bobao',
      lastName: 'ThiagoBobô',
      email: 'Borbaa1004@gmail.com',
      password: '12345678',
      confirmPassword: '87654321'
    };
    await expect(userService.register(data, mockUserModel))
    .rejects
    .toThrow('Não pode ter caracteres especias no primeiro nome');
  });

  it('Red - Irá retornar erro se houver caracteres especiais no sobrenome', async () =>{
    const data = {
      firstName: 'Caiofortao',
      lastName: 'ThiagoMolengo#$%):',
      email: 'Borbaa1004@gmail.com',
      password: '12345678',
      confirmPassword: '87654321'
    };
    await expect(userService.register(data, mockUserModel))
    .rejects
    .toThrow('Não pode ter caracteres especiais no segundo nome');
  });

  it('Red - Irá retornar erro se o email for invalido', async () =>{
    const data = {
      firstName: 'Caiofortao',
      lastName: 'ThiagoMolengo',
      email: 'Borbaa1004ail.com',
      password: '12345678',
      confirmPassword: '87654321'
    };
    await expect(userService.register(data, mockUserModel))
    .rejects
    .toThrow('É preciso que o E-mail seja valido!');
  });

  it('Red - Irá retornar erro se o email já estiver cadastrado', async () =>{
    const data = {
      firstName: 'CaioBorba',
      lastName: 'Thiago',
      email: 'Borbaa1004@gmail.com',
      password: '12345678',
      confirmPassword: '87654321'
    };

    mockUserModel.findOne.mockResolvedValueOnce({id: 1, email: 'Borbaa1004@gmail.com'});

    await expect(userService.register(data, mockUserModel))
    .rejects
    .toThrow('Esse email já está cadastrado');
  });

  it('Red - Irá retornar erro se a senha nao tiver 8 caracteres', async () =>{
    const data = {
      firstName: 'CaioBorba',
      lastName: 'Thiago',
      email: 'Borbaa1004@gmail.com',
      password: '1234567',
      confirmPassword: '1234567'
    }

    await expect(userService.register(data, mockUserModel))
    .rejects
    .toThrow('A senha deve ter pelo menos 8 caracteres');
  });

  it('Red - Irá retornar erro se a senha nao bater com a confirmação de senha', async () =>{
    const data = {
      firstName: 'CaioBorba',
      lastName: 'Thiago',
      email: 'Borbaa1004@gmail.com',
      password: '12345678',
      confirmPassword: '12345679'
    }

    await expect(userService.register(data, mockUserModel))
    .rejects
    .toThrow('A senha não coincide com a confirmação');
  });

  it('Cria novo usuário ADMIN', async () => {
    const data = {
      firstName: 'CaioBorba',
      lastName: 'Thiago',
      email: 'Borbaa1004@gmail.com',
      password: '12345678',
      confirmPassword: '12345678'
    }

    mockUserModel.findOne.mockResolvedValueOnce(null);
    mockUserModel.count.mockResolvedValue(0);
    
    // Ajustado o mock para refletir o retorno real esperado (admin em vez de adm)
    mockUserModel.create.mockResolvedValue({ id: 1, ...data, admin: 'ADMIN' });

    const result = await userService.register(data, mockUserModel);

    expect(mockUserModel.create).toHaveBeenCalledWith(
      expect.objectContaining({ // <--- Corrigido para o singular
        firstName: 'CaioBorba',
        admin: 'ADMIN'
      })
    );

    // Corrigido para acessar 'admin' e usar 'toBe'
    expect(result.admin).toBe('ADMIN');
  });

  it('Cria novo usuário sem ser administrador', async () => {
    const data = {
      firstName: 'CaioBorba',
      lastName: 'Thiago',
      email: 'Borbaa1004@gmail.com',
      password: '12345678',
      confirmPassword: '12345678'
    };

    mockUserModel.findOne.mockResolvedValueOnce(null);
    mockUserModel.count.mockResolvedValue(1);
    
    // Ajustado o mock para refletir o retorno real esperado 
    mockUserModel.create.mockResolvedValue({ id: 2, ...data, admin: 'USER' });

    const result = await userService.register(data, mockUserModel);

    expect(mockUserModel.create).toHaveBeenCalledWith(
      expect.objectContaining({ // <--- Corrigido para o singular
        firstName: 'CaioBorba',
        admin: 'USER'
      })
    );

    // Corrigido para acessar 'user' e usar 'toBe'
    expect(result.admin).toBe('USER');
  });

});