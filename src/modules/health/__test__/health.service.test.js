import { assert, expect, should } from 'chai';
import { getHealth } from '../health.service.js';

// Inicializa a interface 'should' do Chai
should();

describe('Health Service', () => {

    it('Deve retornar status OK e a estrutura completa quando o serviço está saudável', () => {
    const result = getHealth();

    // 1. Usando EXPECT (Tradução direta do seu Vitest)
    expect(result.status).to.equal('OK');
    expect(result).to.have.property('timestamp');

    // 2. Usando ASSERT (Substituindo o antigo .toContain)
    assert.include(result.message, 'saudável', 'A mensagem deve conter a palavra "saudável"');
    assert.isString(result.version, 'A versão retornada deve ser uma string');

    // 3. Usando SHOULD (Para bater a meta de variações)
    result.should.be.an('object');
    result.version.should.equal('1.0.0');
});

});