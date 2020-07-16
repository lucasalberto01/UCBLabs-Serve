const ModelLab = require('./../model/LaboratorioModel')

module.exports = {
    async lista(req, res){
        /*
        setInterval(function(){
            req.io.emit('AtualizacaoLabs', { 'teste' : true })
            console.log('Enviando')
        }, 5000)
        */

        let ListaLab = await ModelLab.ListarLab()
        res.json({'Laboratorios' : ListaLab})
    },
    async adicionar(req, res){
        let {local, capacidade, descricao, id_lab_tipo } = req.body.data
        let adicionado = await ModelLab.adicionar(local, capacidade, descricao, id_lab_tipo)
        if(adicionado){
            res.json({'code' : 200, 'msg' : 'Adicionado com sucesso'})

            let ListaLab = await ModelLab.ListarLab()
            req.io.emit('AtualizacaoLabs', {'Laboratorios' : ListaLab})

        }else{
            res.json({'code' : 500, 'msg' : 'Não foi possivel adicionar'})
        }
        
    },
    async mostrar(req, res){
        const { id } = req.params;
        let dados = await ModelLab.dadosLab(id)
        res.json({'informacoes' : dados })
    },
    async apagar (req, res){
        let { id } = req.params
        let apagado = ModelLab.apagar(id)
        
        if(apagado){
            res.json({'code' : 200, 'msg' : 'Apagado com sucesso'})

            let ListaLab = await ModelLab.ListarLab()
            req.io.emit('AtualizacaoLabs', {'Laboratorios' : ListaLab})

        }else{
            res.json({'code' : 500, 'msg' : 'Não foi possivel Apagar'})
        }
    },
    async editar(req, res){
        let {local, capacidade, descricao, tipo } = req.body.data
        let { id } = req.params
        let editado = await ModelLab.editar(local, capacidade, descricao, tipo, id)
        
        if(editado){
            res.json({'code' : 200, 'msg' : 'Editado com sucesso'})

            let ListaLab = await ModelLab.ListarLab()
            req.io.emit('AtualizacaoLabs', {'Laboratorios' : ListaLab})

        }else{
            res.json({'code' : 500, 'msg' : 'Não foi possivel Editar'})
        }
    }
}