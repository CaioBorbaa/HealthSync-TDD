import { assert, expect, should } from 'chai';
import User from '../src/modules/user/userModel.js';

// Inicializa a interface 'should' do Chai
should(); 

describe('Testes Unitários: User Model', () => {

  it('Deve garantir que o nome do modelo está correto', () => {
    // Usando EXPECT
    expect(User.name).to.equal('User');
  });

  it('Deve possuir a coluna "FullName" configurada como STRING e obrigatória', () => {
    const fullNameAttr = User.rawAttributes.FullName;

    // Usando SHOULD
    fullNameAttr.should.exist;
    
    // Usando ASSERT e EXPECT juntos no mesmo padrão
    assert.strictEqual(fullNameAttr.type.key, 'STRING', 'O tipo deve ser STRING');
    expect(fullNameAttr.allowNull).to.be.false;
  });

  it('Deve possuir a coluna "email" única e com validação de formato', () => {
    const emailAttr = User.rawAttributes.email;

    emailAttr.should.exist;
    assert.isTrue(emailAttr.unique, 'A configuração unique deve ser verdadeira');
    expect(emailAttr.validate.isEmail).to.be.true; // Aqui testamos a sua regra de isEmail!
  });

  it('Deve possuir a coluna "role" com valor padrão "USER"', () => {
    const roleAttr = User.rawAttributes.role;
    
    expect(roleAttr.defaultValue).to.equal('USER');
  });

  it('Deve ter as configurações timestamps e underscored ativadas', () => {
    // Como você ativou os dois no final do seu model, vamos garantir que eles estão lá
    User.options.timestamps.should.be.true;
    assert.isTrue(User.options.underscored);
  });
});