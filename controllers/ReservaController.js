const ReservaModel = require('./../model/ReservaModel')
const PedidoModel = require('./../model/PedidoModel')

module.exports = {
    async lista(req, res){
        let DadosReserva = await ReservaModel.listar()
        res.json({'Dados' : DadosReserva})
    },
    async listar_data(req, res){
        let { date } = req.body.data
        let DadosReserva = await ReservaModel.listar_data(date)
        res.json({'dados' : DadosReserva })
    },
    async lab(req, res){
        const { id } = req.params;
        let DadosReserva = await ReservaModel.listar_lab(id)
        res.json({'dados' : DadosReserva})
    }
    ,async listar_status(req, res){
        let DadosReserva = await ReservaModel.lista_status()
        res.json({'dados' : DadosReserva})
    },
    async exibir(req, res){
        let { id } = req.params;
        let dados = await ReservaModel.exibir(id)
        res.json({'dados' : dados })
    },
    async teste(req, res){
        let DadosReserva = await ReservaModel.teste()
        res.json({'dados' : DadosReserva})

    },
    async verifica(req, res){
        let { id_lab, id_lab_horario, data_reserva } = req.body.data;
        var podeAdicionar = await ReservaModel.verificar(data_reserva, id_lab, id_lab_horario);
        res.json({'existe' : !podeAdicionar});
    },
    async inserir(req, res){
        console.log(req.body);

        let { id_lab, id_disciplina, id_pessoa, id_lab_horario, data_reserva, id_pedido=null } = req.body.data;
        
        var podeAdicionar = await ReservaModel.verificar(data_reserva, id_lab, id_lab_horario);
        
        if(podeAdicionar){
            let adicionado = await ReservaModel.add(id_lab, id_disciplina, id_pessoa, id_lab_horario, data_reserva);

            if(adicionado){

                if(id_pedido){
                    await PedidoModel.concluir(id_pedido)
                }
                
                res.json({'erro' : false, 'code' : 200, 'msg' : 'Adicionado com sucesso'})

                let pedidos = await PedidoModel.listar_todos();
                req.io.emit('AtualizarPedidos', {'pedidos' : pedidos})
                req.io.emit('AtualizacaoReservas', { 'update' : true});
            }else{

                res.json({'erro' : true, 'code' : 404, 'msg' : 'Não foi possivel adicionar'})
            }
            
        }else{
            res.json({'erro' : true, 'code' : 201, 'msg': 'Data Ja Usada'})
        }
    },
    async editar(req, res){
        let { id_reserva, id_lab, id_lab_horario, date } = req.body.data
        console.log(req.body.data)
        await ReservaModel.editar2(id_reserva, id_lab, id_lab_horario, date)
        res.json({'success' : true})
        req.io.emit('AtualizacaoReservas', { 'update' : true});
        
    }
    
    
}