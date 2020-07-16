const { query } = require('./ConnModel')

module.exports =  {
    async ListarLab(){
        let sql = ` SELECT laboratorio.*, lab_tipo.nome AS lab_tipo_nome, lab_tipo.descricao AS lab_tipo_descricao
                    FROM laboratorio 
                    LEFT JOIN lab_tipo ON laboratorio.id_lab_tipo = lab_tipo.id_lab_tipo 
                    ORDER BY local`

        let dadosLaboratorio = await query(sql, [])
        return dadosLaboratorio;
    },
    async adicionar(local, capacidade, descricao, id_lab_tipo){
        let sql = 'INSERT INTO laboratorio (id_lab, local, capacidade, descricao, id_lab_tipo ) VALUES (0, ?, ?, ?, ?)'
        await query(sql, [local, capacidade, descricao, id_lab_tipo])
        return true;
    },
    async dadosLab(id_lab){
        let sql = ` SELECT laboratorio.*, lab_tipo.nome AS lab_tipo_nome, lab_tipo.descricao AS lab_tipo_descricao
                    FROM laboratorio 
                    LEFT JOIN lab_tipo ON lab_tipo.id_lab_tipo =  laboratorio.id_lab_tipo
                    WHERE id_lab = ?`
        let dadosLaboratorio = await query(sql, [id_lab])

        if(dadosLaboratorio.length > 0){
            return dadosLaboratorio[0];

        }else{
            return [];
        }
    },
    async apagar(id_lab){
        let sql = 'DELETE FROM laboratorio WHERE id_lab = ?';
        await query(sql, [id_lab])
        return true;
    },
    async editar(local, capacidade, descricao, tipo, id_lab){
        let sql = 'UPDATE laboratorio SET local = ?, capacidade = ?, descricao = ?, id_lab_tipo = ? WHERE id_lab = ?'
        await query(sql, [local, capacidade, descricao, tipo, id_lab])
        return true;
    }
}