import { Produto } from "../models/produto.models";

const movimentaEstoque = async (req, res, next) => {
  try {
    const produto = await Produto.findById(req.body.id_produto);
    const movimentacao = req.body.movimentacao;
    const quantidade = Number(req.body.quantidade);
    const quantidadeAtual = Number(produto?.quantidade);
    let novaQuantidade = 0;

    movimentacao === 'entrada' ? novaQuantidade = quantidadeAtual + quantidade : novaQuantidade = quantidadeAtual - quantidade;
    
    await Produto.updateOne({ "quantidade": novaQuantidade });
  } catch (err) {
    return res.status(400).send({ error: err });
  }
  next()
};

export { movimentaEstoque };