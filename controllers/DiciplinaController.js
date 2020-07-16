const DiciplinaModel = require('./../model/DiciplinaModel')

module.exports = {
    async listar(req, res){
        let dados = await DiciplinaModel.listar()
        res.json({'diciplinas' : dados});
    },
    async editar(req, res){
        let { nome, cor, professor, id } = req.body.data
        await DiciplinaModel.editar(nome, cor, professor, id)
        res.json({'success' : true});

        let dados = await DiciplinaModel.listar()
        req.io.emit('AtualizacaoDiciplinas', { 'diciplinas' : dados })
    },
    async add(req, res){
        let { nome, cor, professor } = req.body.data
        await DiciplinaModel.add(nome, cor, professor)

        res.json({'success' : true})

        let dados = await DiciplinaModel.listar()
        req.io.emit('AtualizacaoDiciplinas', { 'diciplinas' : dados })
    }
}