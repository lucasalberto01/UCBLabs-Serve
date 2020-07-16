const { query } = require('./ConnModel');
const { verifica } = require('../controllers/ReservaController');
const { apagar } = require('./EquipamentoModel');

module.exports = {
    async listar(){
        let sql = 'SELECT * FROM lab_tipo'
        let dados = await query(sql, []);
        return dados;
    },
    async add(nome, descricao){
        let sql = 'INSERT INTO lab_tipo (nome, descricao) VALUES (?, ?)';
        await query(sql, [nome, descricao])
        return true
    },
    async edit(nome, descricao, id){
        let sql = 'UPDATE lab_tipo SET nome = ?, descricao = ? WHERE id_lab_tipo = ?'
        await query(sql, [nome, descricao, id])
        return true
    },
    async verifica_uso(id){
        let sql = 'SELECT COUNT(*) AS qtd FROM laboratorio WHERE id_lab_tipo = ?';
        let dados = (await query(sql, [id]))[0].qtd
        return parseInt(dados);
    },
    async apagar(id){
        let sql = 'DELETE FROM lab_tipo WHERE id_lab_tipo = ?';
        await query(sql, [id])
        return true;
    }
}