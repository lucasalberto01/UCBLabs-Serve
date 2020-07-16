const AvisosModel = require('./../model/AvisosModel')

module.exports = {
    async listarTiposAlertas(req, res){
        let dadosTiposAvisos = await AvisosModel.listarTiposAlertas();
        res.json({'tipos' : dadosTiposAvisos})
    },
    async add(req, res){
        let {id_aviso, id_reserva, id_lab, id_pessoa, mensagem, data_final, indefinido, sobre } = req.body.data
        
        if(indefinido){
            data_final = null
        }

        await AvisosModel.add(id_aviso, id_reserva, id_lab, id_pessoa, mensagem, data_final, sobre)
        res.json({'sucesso' : true})

        
        let dadosListaAvisos = await AvisosModel.listar()
        //console.log(dadosListaAvisos)
        req.io.emit('UpdateStatusAvisos', { 'avisos' : dadosListaAvisos })
    },
    async lista(req, res){
        var date;
        console.log(req.body)
        if(req.body.data){
            date = req.body.data.date
        }
        var dadosListaAvisos

        console.log(date)

        if(date){
            dadosListaAvisos = await AvisosModel.listar_date(date)
        }else{
            dadosListaAvisos = await AvisosModel.listar()
        }
        
        //console.log(dadosListaAvisos)
        res.json({'lista' : dadosListaAvisos})
    },
    async editar(req, res){
        let {id_aviso, id_tipo_aviso, id_reserva, id_lab, mensagem, data_final, indefinido } = req.body.data
        if(indefinido){
            data_final = null
        }
        await AvisosModel.editar(id_aviso, id_lab, data_final, id_tipo_aviso, mensagem)
        res.json({'sucesso' : true})


        let dadosListaAvisos = await AvisosModel.listar()
        //console.log(dadosListaAvisos)
        req.io.emit('UpdateStatusAvisos', { 'avisos' : dadosListaAvisos })
    },
    async apagar(req, res){
        const { id } = req.params
        console.log(req.params)
        
        await AvisosModel.apagar(id)
        res.json({'sucesso' : true})

        let dadosListaAvisos = await AvisosModel.listar()
        
        req.io.emit('UpdateStatusAvisos', { 'avisos' : dadosListaAvisos })
    }
}