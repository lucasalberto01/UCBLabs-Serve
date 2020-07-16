const { query } = require('./ConnModel')

async function resume(){
    let sql1 = 'SELECT COUNT(*) AS qtd_disciplinas FROM disciplina';
    let qtd_disciplinas = (await query(sql1, []))[0].qtd_disciplinas

    let sql2 = 'SELECT COUNT(*) AS qtd_equipamentos FROM equipamentos';
    let qtd_equipamentos = (await query(sql2, []))[0].qtd_equipamentos

    let sql3 = 'SELECT COUNT(*) AS qtd_manutencao FROM manutencao';
    let qtd_manutencao = (await query(sql3, []))[0].qtd_manutencao

    let sql4 = 'SELECT COUNT(*) AS qtd_pedidos FROM pedidos';
    let qtd_pedidos = (await query(sql4, []))[0].qtd_pedidos

    return {qtd_disciplinas, qtd_equipamentos, qtd_manutencao, qtd_pedidos }
}

async function grafico_manutencao(){
    let sql = ` SELECT 
                    COUNT(*) AS qtd, 
                    DATE(data_entrada) AS date
                FROM manutencao 
                GROUP BY DATE(data_entrada)`

    let dados = await query(sql, [])
    return dados
}

async function grafico_avisos(){
    let sql = ` SELECT 
                    COUNT(*) AS qtd, 
                    DATE(data_criacao) AS date
                FROM aviso_reserva 
                GROUP BY DATE(data_criacao)`

    let dados = await query(sql, [])
    return dados
}

async function grafico_pedidos(){
    let sql = ` SELECT 
                    COUNT(*) AS qtd, 
                    DATE(data_criacao) AS date
                FROM pedidos 
                GROUP BY DATE(data_criacao)`

    let dados = await query(sql, [])
    return dados
}

module.exports = {
    resume,
    grafico_manutencao,
    grafico_avisos,
    grafico_pedidos
}