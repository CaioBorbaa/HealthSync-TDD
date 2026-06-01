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


  
});