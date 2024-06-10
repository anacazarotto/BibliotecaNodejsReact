import emprestimo from "../model/EmprestimoModel.js"
import livro from "../model/LivroModel.js";

async function listar(req, res) {
    await emprestimo
        .findAll()
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function listar_pendentes(req, res) {
    await emprestimo
        .findAll()
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function selecionar(req, res) {
    await emprestimo
        .findByPk(req.params.idemprestimo)
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

async function criar(req, res) {

    if (!req.body.idlivro)
        res.status(500).send("Parametro idlivro é obrigatório.");

    if (!req.body.idpessoa)
        res.status(500).send("Parametro idpessoa é obrigatório.");

    // Define a data atual
    const dataAtual = new Date();
    const dataVencimento = new Date();
    dataVencimento.setMonth(dataAtual.getMonth() + 1);

    await emprestimo
        .create({
            emprestimo_data: dataAtual, // Define a data atual
            vencimento_data: dataVencimento,
            devolucao_data: req.body.devolucao_data || null,
            idlivro: req.body.idlivro,
            idpessoa: req.body.idpessoa,
        })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });

    await livro.update({ emprestado: true }, {
        where: { idlivro: req.body.idlivro },
    });
}

async function alterar(req, res) {

    const dataAtual = new Date();

    await emprestimo
        .update({
            devolucao_data: dataAtual,
        },
            {
                where: {
                    idemprestimo: req.params.idemprestimo
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });

    await livro.update({ emprestado: true }, {
        where: { idlivro: req.body.idlivro },
    });
}

async function excluir(req, res) {
    await emprestimo
        .destroy(
            {
                where: {
                    idemprestimo: req.params.idemprestimo
                }
            })
        .then(resultado => { res.status(200).json(resultado) })
        .catch(erro => { res.status(500).json(erro) });
}

export default { listar, selecionar, criar, alterar, excluir, listar_pendentes };