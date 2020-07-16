const TipoAvisoModel = require('./../model/TipoAvisosModel')

async function listar(req, res){
    let dadosListaAvisos = await TipoAvisoModel.listar()
    res.json({'lista' : dadosListaAvisos})
}

async function add(req, res){
    let { icone, cor, tipo } = req.body.data
    await TipoAvisoModel.criar(cor, tipo, icone)

    res.json({'success' : true})

    let dadosListaAvisos = await TipoAvisoModel.listar()
    req.io.emit('AtualizacaoTiposAvisos', {'lista' : dadosListaAvisos})

}

async function update(req, res){
    let { id, cor, icone, tipo } = req.body.data
    await TipoAvisoModel.update(id, cor, icone, tipo)

    res.json({'success' : true})

    let dadosListaAvisos = await TipoAvisoModel.listar()
    req.io.emit('AtualizacaoTiposAvisos', {'lista' : dadosListaAvisos})
}

async function deleted(req, res){
    let { id } = req.body.data

    await TipoAvisoModel.deleted(id)

    res.json({'success' : true})

    let dadosListaAvisos = await TipoAvisoModel.listar()
    req.io.emit('AtualizacaoTiposAvisos', {'lista' : dadosListaAvisos})
}

async function enable(req, res){
    let { id } = req.body.data

    await TipoAvisoModel.enable(id)

    res.json({'success' : true})

    let dadosListaAvisos = await TipoAvisoModel.listar()
    req.io.emit('AtualizacaoTiposAvisos', {'lista' : dadosListaAvisos})
}

module.exports = {
    listar,
    add,
    update,
    deleted,
    enable
}