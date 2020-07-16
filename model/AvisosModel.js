const { query } = require('./ConnModel')

module.exports = {
    async listarTiposAlertas(){
        let sql = 'SELECT * FROM aviso'
        let dadosTipos = await query(sql, [])

        return dadosTipos;
    },
    async add(id_aviso, id_reserva, id_lab, id_pessoa, mensagem, data_final, sobre){
        let sql = 'INSERT INTO aviso_reserva (id_aviso_reserva, id_aviso, id_reserva, id_lab, id_pessoa, mensagem, sobre, data_final) VALUES (0, ?, ?, ?, ?, ?, ?, ?)';
        await query(sql, [id_aviso, id_reserva, id_lab, id_pessoa, mensagem, sobre, data_final]);
    },
    async listar(){
        let sql = ` SELECT aviso.id_aviso as id_tipo_aviso, mensagem, data_criacao, data_final, icone, tipo, color, local, id_aviso_reserva, aviso_reserva.id_lab, aviso_reserva.id_reserva, sobre
                    FROM aviso_reserva, aviso, laboratorio 
                    WHERE aviso_reserva.id_aviso = aviso.id_aviso AND aviso_reserva.id_lab = laboratorio.id_lab AND (data_final > NOW() OR data_final IS NULL)`

        let dadosListaAvisos = await query(sql, [])
        return dadosListaAvisos;

    },
    async listar_date(date){
        let sql = ` SELECT 
                    aviso.id_aviso as id_tipo_aviso, mensagem, data_criacao, data_final, icone, tipo, color, local, id_aviso_reserva, aviso_reserva.id_lab, aviso_reserva.id_reserva, sobre
                    FROM aviso_reserva
                    LEFT JOIN aviso ON aviso_reserva.id_aviso = aviso.id_aviso
                    LEFT JOIN laboratorio ON aviso_reserva.id_lab = laboratorio.id_lab 
                    WHERE DATE(data_criacao) = ? `

        let dadosListaAvisos = await query(sql, [date])
        return dadosListaAvisos;

    },
    async editar(id_aviso, id_lab, data_termino, id_tipo_aviso, mensagem){
        let sql = 'UPDATE aviso_reserva SET id_aviso = ?, id_lab = ?, mensagem = ?, data_final = ? WHERE id_aviso_reserva = ?'
        await query(sql, [id_tipo_aviso, id_lab,mensagem, data_termino, id_aviso])
    },
    async apagar(id_aviso){
        let sql = 'DELETE FROM aviso_reserva WHERE id_aviso_reserva = ?'
        await query(sql, [id_aviso])
    }
}