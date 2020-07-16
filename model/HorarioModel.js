const { query } = require('./ConnModel')
const moment = require('moment');

var inicio_horario = '2019-10-17 08:00:00';
var fim_horario = '2019-10-17 22:00:00';
var atual = null


module.exports = {
    async inserir(){
        var sql = 'INSERT INTO lab_horario (hora_inicio, hora_fim, id_lab) VALUES (?, ?, ?)'

        while(true){

        
            if(atual === null){
                atual = inicio_horario
            }
            let atual_old = atual;
            atual = moment(atual, 'YYYY-MM-DD HH:mm:ss').add({minutes : 30}).format('YYYY-MM-DD HH:mm:ss')
            let continuar = !moment(atual, 'YYYY-MM-DD HH:mm:ss').isAfter(fim_horario);

            if(continuar){
                
                await query(sql, [atual_old, atual, 1])
                console.log(atual_old, atual)
                
            }else{
                console.log('Cabo')
                break;
                
            }
            //break;
        }
        
    },
    async listar(data, id_lab){
        let sql = `
        select 
            reserva.id_laboratorio AS id_lab,
            id_reserva,
            disciplina.nome_disciplina as materia, 
            lab_horario.hora_inicio,
            lab_horario.hora_fim,
            concat(reserva.data_reserva,' ',lab_horario.hora_inicio) AS data_inicio,
            concat(reserva.data_reserva,' ',lab_horario.hora_fim) AS data_fim,
            reserva.data_reserva,
            lab_horario.id_lab_horario,
            color

        from lab_horario 
        LEFT JOIN reserva on reserva.id_lab_horario = lab_horario.id_lab_horario AND data_reserva = ? AND reserva.id_laboratorio = ?
        LEFT JOIN disciplina ON reserva.id_disciplina = disciplina.id_disciplina
		ORDER BY hora_inicio
        `
        let dados = await query(sql, [data, id_lab])
        return dados;
    },
    async todos_horarios(){
        let sql = 'SELECT DISTINCT hora_inicio, hora_fim FROM lab_horario ORDER BY hora_inicio ASC';
        let dados = await query(sql, [])
        return dados;
    }
}