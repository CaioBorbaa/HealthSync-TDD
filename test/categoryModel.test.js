import { assert, expect, should } from 'chai';
import Category from '../src/modules/category/categoryModel.js';

// Inicializa a interface 'should' do Chai
should(); 

describe('Testes Unitários: Category Model', () => {

  it('Deve garantir que o nome do modelo está correto', () => {
    // Usando EXPECT (.to.equal)
    expect(Category.name).to.equal('Category');
  });

  it('Deve possuir a coluna "name" com as restrições corretas', () => {
    const nameAttribute = Category.rawAttributes.name;

    // Usando SHOULD (.should.exist e .should.have.property)
    nameAttribute.should.exist;
    nameAttribute.should.have.property('allowNull', false);

    // Usando ASSERT (isTrue e strictEqual)
    assert.isTrue(nameAttribute.unique, 'A configuração unique deve ser verdadeira');
    assert.strictEqual(nameAttribute.type.key, 'STRING', 'O tipo de dado deve ser STRING');
  });

  it('Deve possuir a coluna "description" como TEXT', () => {
    const descAttribute = Category.rawAttributes.description;

    // Usando EXPECT (.to.be.an e .to.have.property)
    expect(descAttribute).to.be.an('object');
    expect(descAttribute).to.have.property('type');

    // Usando ASSERT (equal)
    assert.equal(descAttribute.type.key, 'TEXT', 'O tipo de dado deve ser TEXT');
  });

  it('Deve ter as timestamps desativadas na configuração', () => {
    // Usando SHOULD (.should.be.false)
    Category.options.timestamps.should.be.false;
    
    // Usando EXPECT (.to.be.false)
    expect(Category.options.timestamps).to.be.false;
  });
});