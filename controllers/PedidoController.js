const PedidoModel = require('./../model/PedidoModel');

module.exports = {
    async novo(req, res){
        let { id_remetente, id_diciplina, data, hora, observacao, id_tipo_lab } = req.body.data;
        await PedidoModel.novo(id_remetente, id_diciplina, data, hora, observacao, id_tipo_lab);
        res.json({'success' : true});

        let pedidos = await PedidoModel.listar_todos();
        req.io.emit('AtualizarPedidos', {'pedidos' : pedidos})
    },
    async listar(req, res){
        const { id } = req.params
        let dados = await PedidoModel.listar_remente(id);
        res.json({'pedidos' : dados})
        
    },
    async listar_data(req, res){
        const { id } = req.params
        const { date } = req.body.data;
        console.log({date, id})
        let dados = await PedidoModel.listar_remente_data(id, date);
        res.json({'pedidos' : dados})
    },
    async listar_todos(req, res){
        let dados = await PedidoModel.listar_todos();
        res.json({'pedidos' : dados})
    },
    async exibir(req, res){
        const { id } = req.params
        let dados = await PedidoModel.exibir(id);
        res.json({'pedido' : dados})
    },
    async cancelar(req, res){
        const { id } = req.params
        let dados = await PedidoModel.cancelar(id)
        res.json({'success' : dados })

        let pedidos = await PedidoModel.listar_todos();
        req.io.emit('AtualizarPedidos', {'pedidos' : pedidos})
    }
}