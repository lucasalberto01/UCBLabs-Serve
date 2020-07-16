const LaboratorioTiposModel = require('./../model/LaboratorioTIposModel')

async function listar(req, res){
    var dados = await LaboratorioTiposModel.listar()
    res.json({'tipos' : dados});
}

async function adicionar(req, res){
    let { nome, descricao } = req.body.data
    await LaboratorioTiposModel.add(nome, descricao)
    res.json({ 'success' : true})

    var dados = await LaboratorioTiposModel.listar()
    req.io.emit('UpdateTipoLab', { 'tipos' : dados })
}

async function editar(req, res){
    let { id, nome, descricao } = req.body.data
    console.log(req.body.data)

    await LaboratorioTiposModel.edit(nome, descricao, id)
    res.json({ 'success' : true})

    var dados = await LaboratorioTiposModel.listar()
    req.io.emit('UpdateTipoLab', { 'tipos' : dados })

}

async function apagar(req, res){
    let { id } = req.body.data

    let n_lab_usando = await LaboratorioTiposModel.verifica_uso(id)

    if(n_lab_usando === 0){
        await LaboratorioTiposModel.apagar(id)
        res.json({'code' : 200, 'msg' : 'Apagado com sucesso'})
    }else{
        res.json({'code' : 403, 'msg' : 'Tipo em uso', n_lab_usando})
    }
}

module.exports = {
    listar,
    adicionar,
    editar,
    apagar
}