import request from 'supertest';
import express from 'express';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import * as remedioController from '../remedio.controller.js';
import * as remedioService from '../remedio.service.js';

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.post('/remedios', remedioController.register);

describe('Remédio Controller - Testes de Integração', () => {

    beforeEach(() => {
        vi.spyOn(remedioService, 'register');
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('Integração (Falha) - Deve retornar status 400 se faltarem dados', async () => {
        remedioService.register.mockRejectedValueOnce(new Error('Preencha todos os campos obrigatórios do medicamento'));

        const response = await request(app)
            .post('/remedios')
            .send({ dosagem: '500mg', frequencia: '8 em 8 horas' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Preencha todos os campos obrigatórios do medicamento');
    });

    it('Integração (Falha) - Deve retornar status 400 se o nome for muito curto', async () => {
        remedioService.register.mockRejectedValueOnce(new Error('O nome do medicamento deve ter pelo menos 2 caracteres'));

        const response = await request(app)
            .post('/remedios')
            .send({ nome: 'A', dosagem: '500mg', frequencia: '8 em 8', tipo: 'Comprimido' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('O nome do medicamento deve ter pelo menos 2 caracteres');
    });

    it('Integração (Falha) - Deve retornar status 400 se o medicamento já existir', async () => {
        remedioService.register.mockRejectedValueOnce(new Error('Este medicamento já está registrado'));

        const response = await request(app)
            .post('/remedios')
            .send({ nome: 'Paracetamol', dosagem: '500mg', frequencia: '8 em 8', tipo: 'Comprimido' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Este medicamento já está registrado');
    });

    it('Integração (Falha) - Deve retornar status 400 para caracteres especiais no nome', async () => {
        remedioService.register.mockRejectedValueOnce(new Error('O nome não pode conter caracteres especiais'));

        const response = await request(app)
            .post('/remedios')
            .send({ nome: 'Paracetamol@!', dosagem: '500mg', frequencia: '8 em 8', tipo: 'Comprimido' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('O nome não pode conter caracteres especiais');
    });

    it('Integração (Falha) - Deve retornar status 400 se a dosagem for vazia', async () => {
        remedioService.register.mockRejectedValueOnce(new Error('A dosagem não pode ser vazia ou conter apenas espaços'));

        const response = await request(app)
            .post('/remedios')
            .send({ nome: 'Dipirona', dosagem: '   ', frequencia: '6 em 6', tipo: 'Gotas' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('A dosagem não pode ser vazia ou conter apenas espaços');
    });

    it('Integração (Falha) - Deve retornar status 400 se a frequência for negativa', async () => {
        remedioService.register.mockRejectedValueOnce(new Error('A frequência não pode conter valores negativos'));

        const response = await request(app)
            .post('/remedios')
            .send({ nome: 'Dipirona', dosagem: '500mg', frequencia: '-8 horas', tipo: 'Gotas' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('A frequência não pode conter valores negativos');
    });

    it('Integração (Falha) - Deve retornar status 400 se o tipo não for informado', async () => {
        remedioService.register.mockRejectedValueOnce(new Error('O tipo do medicamento é obrigatório'));

        const response = await request(app)
            .post('/remedios')
            .send({ nome: 'Dipirona', dosagem: '500mg', frequencia: '6 em 6 horas' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('O tipo do medicamento é obrigatório');
    });

    it('Integração (Falha) - Deve retornar status 400 se o tipo for inválido', async () => {
        remedioService.register.mockRejectedValueOnce(new Error('Tipo de medicamento inválido'));

        const response = await request(app)
            .post('/remedios')
            .send({ nome: 'Dipirona', dosagem: '500mg', frequencia: '6 em 6 horas', tipo: 'Doce' });

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Tipo de medicamento inválido');
    });

    it('Integração (Sucesso) - Deve validar a interação com o Service mockado', async () => {
        remedioService.register.mockResolvedValueOnce({ id: 1, nome: 'Ibuprofeno' });

        const dadosRemedio = {
            nome: 'Ibuprofeno',
            dosagem: '400mg',
            frequencia: '12 em 12 horas',
            tipo: 'Comprimido'
        };

        await request(app).post('/remedios').send(dadosRemedio);

        expect(remedioService.register).toHaveBeenCalledTimes(1);
        expect(remedioService.register).toHaveBeenCalledWith(dadosRemedio, expect.anything());
    });

    it('Integração (Sucesso) - Deve realizar um redirecionamento (status 302) após criar com sucesso', async () => {
        remedioService.register.mockResolvedValueOnce({ id: 1, nome: 'Ibuprofeno' });

        const response = await request(app)
            .post('/remedios')
            .send({
                nome: 'Ibuprofeno',
                dosagem: '400mg',
                frequencia: '12 em 12 horas',
                tipo: 'Comprimido'
            });

        expect(response.status).toBe(302);
        expect(response.header.location).toBe('/remedios');
    });
});