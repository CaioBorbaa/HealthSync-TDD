export const register = async (data, model) => {
    const { nome, dosagem, frequencia, tipo } = data;

    if (!nome || !dosagem || !frequencia) {
        throw new Error('Preencha todos os campos obrigatórios do medicamento');
    }

    if (nome.length < 2) {
        throw new Error('O nome do medicamento deve ter pelo menos 2 caracteres');
    }

    const regexNome = /^[A-Za-zÀ-ÿ0-9\s]+$/;
    if (!regexNome.test(nome)) {
        throw new Error('O nome não pode conter caracteres especiais');
    }

    if (dosagem.trim() === '') {
        throw new Error('A dosagem não pode ser vazia ou conter apenas espaços');
    }

    if (String(frequencia).includes('-')) {
        throw new Error('A frequência não pode conter valores negativos');
    }

    const remedioEncontrado = await model.findOne({
        where: { nome: nome }
    });

    if (remedioEncontrado) {
        throw new Error('Este medicamento já está registrado');
    }

    if (!tipo) {
        throw new Error('O tipo do medicamento é obrigatório');
    }

    const tiposValidos = ['Comprimido', 'Gotas', 'Xarope', 'Pomada', 'Injeção', 'Cápsula'];
    if (!tiposValidos.includes(tipo)) {
        throw new Error('Tipo de medicamento inválido');
    }

    const novoRemedio = await model.create({
        nome: nome,
        dosagem: dosagem,
        frequencia: frequencia,
        tipo: tipo
    });

    return novoRemedio;
};