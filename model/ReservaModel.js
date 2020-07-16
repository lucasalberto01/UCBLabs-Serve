const { query } = require('./ConnModel')

module.exports = {
    async listar(){
        let sql = 'SELECT * FROM reserva';
        let dadosReserva = await query(sql, [])
        return dadosReserva
    },
    async listar_data(data){
        console.log(data)
        let sql = `
        SELECT id_reserva, laboratorio.local, disciplina.nome_disciplina, lab_horario.hora_inicio, lab_horario.hora_fim, disciplina.nome_professor
        FROM reserva
        LEFT JOIN disciplina  ON reserva.id_disciplina = disciplina.id_disciplina
        LEFT JOIN lab_horario ON reserva.id_lab_horario = lab_horario.id_lab_horario
        LEFT JOIN laboratorio ON reserva.id_laboratorio = laboratorio.id_lab
        WHERE data_reserva = ?
        `;
        let dadosReserva = await query(sql, [data])
        return dadosReserva
    },
    async listar_lab(id_lab){
        let sql = 'SELECT * FROM reserva WHERE id_laboratorio = ?'
        let dadosReserva = await query(sql, [id_lab])
        return dadosReserva;
    },
    async lista_status(){
        let sql = `
        SELECT id_lab, local, data_inicio, data_termino, materiaa FROM reserva
        LEFT JOIN laboratorio ON reserva.id_laboratorio = laboratorio.id_lab
        WHERE (data_inicio > NOW() OR (data_inicio < NOW() AND data_termino > NOw()) ) OR data_inicio IS NULL
        `
        let dadosReserva = await query(sql, [])
        return dadosReserva;
    },
    async lista_status2(id_lab){
        let sql = 'SELECT * FROM reserva WHERE id_laboratorio = ? AND (data_inicio > NOW() OR (data_inicio < NOW() AND data_termino > NOw()) )'
        let dadosReserva = await query(sql, [id_lab])
        
        return dadosReserva;
    },
    async exibir(id_reserva){
        let sql = `
            SELECT 
                reserva.id_reserva,
                reserva.data_reserva, 
                disciplina.nome_disciplina,
                disciplina.nome_professor,
                disciplina.color,
                laboratorio.local,
                lab_tipo.nome AS lab_tipo,
                laboratorio.id_lab,
                laboratorio.descricao,
                lab_horario.hora_inicio,
                lab_horario.hora_fim,
                concat(reserva.data_reserva,' ',lab_horario.hora_inicio) AS data_inicio,
                concat(reserva.data_reserva,' ',lab_horario.hora_fim) AS data_fim
                
            FROM reserva
                LEFT JOIN disciplina ON disciplina.id_disciplina = reserva.id_disciplina
                LEFT JOIN laboratorio ON laboratorio.id_lab = reserva.id_laboratorio
                LEFT JOIN lab_tipo ON laboratorio.id_lab_tipo = lab_tipo.id_lab_tipo
                LEFT JOIN lab_horario ON lab_horario.id_lab_horario = reserva.id_lab_horario
            WHERE 
                reserva.id_reserva = ?
        `

        let dados = await query(sql, [id_reserva]);
        return dados;
    },
    async add(id_lab, id_disciplina, id_pes, id_lab_horario, date){
        let sql = 'INSERT INTO reserva (id_reserva, id_laboratorio, id_disciplina, id_pessoa, id_lab_horario, data_reserva) VALUES (0, ?, ?, ?, ?, ?)';
        await query(sql, [id_lab, id_disciplina, id_pes, id_lab_horario, date])
        return true;
    },

    async verificar(date, id_lab, id_horario){
        let sql = 'SELECT * FROM reserva WHERE data_reserva = ? AND id_laboratorio = ? AND id_lab_horario = ?'
        let dadosReserva = await query(sql, [date, id_lab, id_horario]);
        if(dadosReserva.length === 0){
            return true
        }else{
            return false
        }
    },
    async editar(date, id_lab, id_lab_horario, id_disciplina){
        let sql = 'SELECT COUNT(*) as qtd, id_reserva FROM reserva WHERE data_reserva = ? AND id_laboratorio = ? AND id_lab_horario';
        let dados = await query(sql, [date, id_lab, id_lab_horario])

        if(dados[0].qtd.length > 0){
            let sql1 = 'UPDATE reserva SET id_diciplina = ? WHERE id_reserva = ?';
            await query(sql1, [id_disciplina, dados[0].id_reserva]);

            return true;
            
        }else{
            return false;
        }

    },
    async editar2(id_reserva, id_lab, id_lab_horario, date){
        let sql = "UPDATE reserva SET id_laboratorio = ?, id_lab_horario = ?,  data_reserva = ? WHERE id_reserva = ? ";
        await query(sql, [id_lab, id_lab_horario, date, id_reserva])
        return true
    }
}