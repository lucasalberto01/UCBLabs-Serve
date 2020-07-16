const RelatorioModel = require('../model/RelatorioModel')

async function resume(req, res){
    let dados = await RelatorioModel.resume()
    res.json({'success' : true, dados})
}

async function grafico_manutancao(req, res){
    let dados = await RelatorioModel.grafico_manutencao()
    res.json(dados)

}

async function grafico_avisos(req, res){
    let dados = await RelatorioModel.grafico_avisos()
    res.json(dados)

}

async function grafico_pedidos(req, res){
    let dados = await RelatorioModel.grafico_pedidos()
    res.json(dados)

}
module.exports = {
    resume,
    grafico_manutancao,
    grafico_avisos,
    grafico_pedidos
}