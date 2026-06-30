import * as remedioService from './remedio.service.js';
import Remedio from './remedioModel.js';

export const register = async (req, res) => {
    try {
        const dadosRemedio = req.body;

        await remedioService.register(dadosRemedio, Remedio);

        return res.redirect('/remedios');

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};