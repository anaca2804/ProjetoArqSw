import { Produto } from "../models/produto.models";

const movimentaEstoque = async (req, res, next) => {
  try {
    const produto = await Produto.findById(req.body.id_produto);
    const movimentacao = req.body.movimentacao;
    const quantidade = Number(req.body.quantidade);
    const quantidadeAtual = Number(produto?.quantidade);
    let novaQuantidade = 0;

    if(!produto) {
      res.status(404).send({ message: 'documento não encontrado' })
    }else {

      movimentacao === 'entrada' ? novaQuantidade = quantidadeAtual + quantidade : novaQuantidade = quantidadeAtual - quantidade;
      if (novaQuantidade >= 0) {
        await produto.updateOne({ "quantidade": novaQuantidade });
      } else {
        res.status(400).send({ message: 'não é permitida quantidades nulas' })
      }
    
    }
    
  } catch (err) {
    return res.status(400).send({ error: err });
  }
  next()
};

export { movimentaEstoque };