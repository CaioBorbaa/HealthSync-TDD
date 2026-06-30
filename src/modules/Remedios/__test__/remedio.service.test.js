import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as remedioService from '../remedio.service.js';

describe('Remédio Service - Registro de Medicamento', () => {
    let mockRemedioModel;

    beforeEach(() => {
        mockRemedioModel = {
        findOne: vi.fn(),
        create: vi.fn()
        };
    });

    it('Retornará um erro se estiver faltando dados', async () => {
        const data = {
        dosagem: '500mg',
        frequencia: '8 em 8 horas'
        };
        
        await expect(remedioService.register(data, mockRemedioModel))
        .rejects
        .toThrow('Preencha todos os campos obrigatórios do medicamento');
    });

    it('Vai retornar erro se o nome do medicamento estiver muito curto', async () => {
        const data = {
        nome: 'A',
        dosagem: '500mg',
        frequencia: '8 em 8 horas',
        tipo: 'Dor de cabeça'
        };
        
        await expect(remedioService.register(data, mockRemedioModel))
        .rejects
        .toThrow('O nome do medicamento deve ter pelo menos 2 caracteres');
    });

    it('Se o medicamento já estiver cadastrado , vai retornar um erro', async () => {
        const data = {
        nome: 'Paracetamol',
        dosagem: '500mg',
        frequencia: '8 em 8 horas'
        };

        mockRemedioModel.findOne.mockResolvedValueOnce({ id: 1, nome: 'Paracetamol' });

        await expect(remedioService.register(data, mockRemedioModel))
        .rejects
        .toThrow('Este medicamento já está registrado');
    });

    it('Caso o medicamento tenha algum caracter especial vai retornar erro', async () => {
        const data = {
        nome: 'Paracetamol@!',
        dosagem: '500mg',
        frequencia: '8 em 8 horas'
        };
        
        await expect(remedioService.register(data, mockRemedioModel))
        .rejects
        .toThrow('O nome não pode conter caracteres especiais');
    });

    it('Irá retornar erro se a dosagem tiver apenas espaços', async () => {
        const data = {
        nome: 'Dipirona',
        dosagem: '   ', 
        frequencia: '6 em 6 horas'
        };
        
        await expect(remedioService.register(data, mockRemedioModel))
        .rejects
        .toThrow('A dosagem não pode ser vazia ou conter apenas espaços');
    });

    it('Vai retornar erro se a frequência tiver valores negativos', async () => {
        const data = {
        nome: 'Dipirona',
        dosagem: '500mg',
        frequencia: '-8 horas'
        };
        
        await expect(remedioService.register(data, mockRemedioModel))
        .rejects
        .toThrow('A frequência não pode conter valores negativos');
    });

    it('vai retornar um erro se o tipo do medicamento não for estiver informado', async () => {
        const data = {
        nome: 'Dipirona',
        dosagem: '500mg',
        frequencia: '6 em 6 horas'
        };
        
        await expect(remedioService.register(data, mockRemedioModel))
        .rejects
        .toThrow('O tipo do medicamento é obrigatório');
    });

    it('Se o tipo do medicamento for inválido vai aparecer erro', async () => {
        const data = {
        nome: 'Dipirona',
        dosagem: '500mg',
        frequencia: '6 em 6 horas',
        tipo: 'Doce'
        };
        
        await expect(remedioService.register(data, mockRemedioModel))
        .rejects
        .toThrow('Tipo de medicamento inválido');
    });

    it('Cria um novo medicamento com sucesso', async () => {
        const data = {
        nome: 'Ibuprofeno',
        dosagem: '400mg',
        frequencia: '12 em 12 horas',
        tipo: 'Comprimido'
        };

        mockRemedioModel.findOne.mockResolvedValueOnce(null);
        mockRemedioModel.create.mockResolvedValue({ id: 1, ...data });

        const result = await remedioService.register(data, mockRemedioModel);

        expect(result).toHaveProperty('id', 1);
        expect(result.nome).toBe('Ibuprofeno');
        expect(result.tipo).toBe('Comprimido');
    });

    it('Verifica se o método create do model foi chamado com os dados corretos no banco', async () => {
        const data = {
        nome: 'Ibuprofeno',
        dosagem: '400mg',
        frequencia: '12 em 12 horas',
        tipo: 'Comprimido'
        };

        mockRemedioModel.findOne.mockResolvedValueOnce(null);
        mockRemedioModel.create.mockResolvedValue({ id: 1, ...data });

        await remedioService.register(data, mockRemedioModel);

        expect(mockRemedioModel.create).toHaveBeenCalledWith(
        expect.objectContaining({
            nome: 'Ibuprofeno',
            dosagem: '400mg',
            tipo: 'Comprimido'
        })
        );
    });
});