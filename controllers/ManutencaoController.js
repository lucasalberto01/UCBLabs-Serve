const ManutencaoModel = require('./../model/ManutencaoModel')

async function save(req, res){
    let { id_equipamento, id_lab, descricao } = req.body.data

    await ManutencaoModel.add(id_equipamento, 1, id_lab, descricao);

    res.json({'success' : true})

    let dados = await ManutencaoModel.lisar()
    req.io.emit('UpdateManutencao', { 'manutencao' : dados})
}

async function edit(req, res){
    let {id, id_status, obs} = req.body.data
    await ManutencaoModel.edit(id_status, obs, id)
    res.json({'success' : true})

    let dados = await ManutencaoModel.lisar()
    req.io.emit('UpdateManutencao', { 'manutencao' : dados})
}

async function listar(req, res){
    
    let dados = await ManutencaoModel.lisar()
    res.json({'manutencao' : dados})
}

async function lista_status(req, res){
    let dados = await ManutencaoModel.listar_status()
    res.json({'status' : dados })
}

module.exports = {
    save,
    edit,
    listar,
    lista_status
}