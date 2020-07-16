const { query } = require('./../model/ConnModel')

async function add( id_equipamento, id_status, id_lab, obs){
    let sql = 'INSERT INTO manutencao (id, id_equipamento, id_status, id_lab, data_entrada, obs) VALUES (0, ?, ?, ?, NOW(), ? )'
    let dados = await query(sql, [id_equipamento, id_status, id_lab, obs])
    return dados
}

async function edit(id_status, obs, id){
    let sql = 'UPDATE manutencao SET id_status = ?, obs = ? WHERE id = ?';
    let dados = await query(sql, [id_status, obs, id])
    return dados;
}

async function lisar(){
    let sql = `
        SELECT manutencao.id, id_equipamento, id_status, data_entrada, obs, manutencao_status.nome AS status, laboratorio.local, equipamentos.nome
        FROM manutencao
        LEFT JOIN manutencao_status ON id_status = manutencao_status.id
        LEFT JOIN laboratorio ON manutencao.id_lab = laboratorio.id_lab
        LEFT JOIN equipamentos ON manutencao.id_equipamento = equipamentos.id
    `
    let dados = await query(sql, []);
    return dados

}

async function listar_status(){
    let sql = `SELECT * FROM manutencao_status`
    let dados = await query(sql, []);
    return dados
}

module.exports = {
    add,
    lisar,
    listar_status,
    edit
}