const { query } = require('./ConnModel')

module.exports = {
    async listar(){
        let sql = 'SELECT * FROM disciplina ORDER BY nome_disciplina ASC';
        let dados = await query(sql, []);
        return dados;
    },
    async editar(nome, cor, professor, id){
        let sql = 'UPDATE disciplina SET color = ?, nome_disciplina = ?, nome_professor = ? WHERE id_disciplina = ?';
        await query(sql, [cor, nome, professor, id])
        return true
    },
    async add(nome, cor, professor){
        let sql = 'INSERT INTO disciplina (id_disciplina, nome_disciplina, nome_professor, color) VALUES (0, ?, ?, ?)';
        let dados = await query(sql, [ nome, professor, cor])
        return true
    }
}