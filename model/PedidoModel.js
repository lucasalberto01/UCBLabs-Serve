const { query } = require('./ConnModel')

module.exports = {
    async novo(id_remetente, id_diciplina, data, hora, observacao, id_tipo_lab){
        let sql = 'INSERT INTO pedidos (id_pedido, id_remetente, id_diciplina, data, hora_inicio, hora_fim, observacao, id_tipo_lab) VALUES (0, ?, ?, ?, ?, ?, ?, ?)';
        await query(sql, [id_remetente, id_diciplina, data, hora.hora_inicio, hora.hora_fim, observacao, id_tipo_lab]);
        return true;
    },
    async listar_remente(id_remetente){
        let sql = 'SELECT * FROM pedidos, disciplina WHERE pedidos.id_diciplina = disciplina.id_disciplina AND id_remetente = ?'
        let dados = await query(sql, [id_remetente])
        return dados;
    },
    async listar_remente_data(id_remetente, date){
        let sql = 'SELECT * FROM pedidos LEFT JOIN disciplina ON pedidos.id_diciplina = disciplina.id_disciplina WHERE id_remetente = ? AND DATE(data_criacao) = ?'
        let dados = await query(sql, [id_remetente, date])
        return dados;
    },
    async listar_todos(){
        let sql = 'SELECT * FROM pedidos, disciplina WHERE pedidos.id_diciplina = disciplina.id_disciplina AND status = "em andamento"'
        let dados = await query(sql, [])
        return dados;
    },
    async exibir(id_pedido){
        let sql = 'SELECT * FROM pedidos, disciplina, lab_tipo WHERE pedidos.id_diciplina = disciplina.id_disciplina AND lab_tipo.id_lab_tipo = pedidos.id_tipo_lab AND id_pedido = ?'
        let dados = await query(sql, [id_pedido])
        return dados[0];
    },
    async concluir(id_pedido){
        let sql = 'UPDATE pedidos SET status = "Aprovado" WHERE id_pedido = ?';
        await query(sql, [id_pedido]);
        return true;
    },
    async cancelar(id_pedido){
        let sql = 'UPDATE pedidos SET status = "Cancelado" WHERE id_pedido = ?';
        await query(sql, [id_pedido]);
        return true;
    }

}