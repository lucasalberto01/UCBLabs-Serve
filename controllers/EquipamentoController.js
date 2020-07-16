const EquipamentosModel = require('./../model/EquipamentoModel')

async function listar(req, res){
    let {id_lab} = req.body.data
    let dados = await EquipamentosModel.listar(id_lab)
    res.json(dados)
}

async function add(req, res){
    let {nome, descricao, code, id_lab} = req.body.data
    await EquipamentosModel.add(nome, descricao, code, id_lab)
    res.json({'success' : true})

    let dados = await EquipamentosModel.listar(id_lab)
    req.io.emit('UpdateEquipamentos', { 'equipamentos' : dados })
}

async function edit(req, res){
    let {nome, descricao, code, id_lab} = req.body.data
    let { id } = req.params;
    await EquipamentosModel.update(id, nome, descricao, code, id_lab)
    res.json({'success' : true})

    let dados = await EquipamentosModel.listar(id_lab)
    req.io.emit('UpdateEquipamentos', { 'equipamentos' : dados })
}

async function apagar(req, res){
    let { id_lab } = req.body.data
    let { id } = req.params;
    console.log({id , id_lab})
    await EquipamentosModel.apagar(id)
    res.json({'success' : true})

    let dados = await EquipamentosModel.listar(id_lab)
    req.io.emit('UpdateEquipamentos', { 'equipamentos' : dados })
}

module.exports = {
    listar,
    add,
    edit,
    apagar
}