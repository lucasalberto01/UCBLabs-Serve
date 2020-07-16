const HorariosModel = require('./../model/HorarioModel')

module.exports = {
    inserir(req, res){
        HorariosModel.inserir();
        res.json({'sucess' : true})
    },
    async listar(req, res){
        let { data, id_lab } = req.body.data;
        console.log(req.body);
        let saida = await HorariosModel.listar(data, id_lab);
        res.json({'dados' : saida })
    },
    async litar_horarios(req, res){
        let dados = await HorariosModel.todos_horarios();
        res.json({'horarios' : dados})
    }
}