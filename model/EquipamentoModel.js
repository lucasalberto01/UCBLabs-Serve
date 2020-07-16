const { query } = require('./../model/ConnModel')

async function listar(id_lab){
    let sql = `
        SELECT equipamentos.id, nome, equipamentos.descricao, code, equipamentos.id_lab, local
        FROM equipamentos
        LEFT JOIN laboratorio ON equipamentos.id_lab = laboratorio.id_lab
        WHERE ${(id_lab === null || id_lab === -1) ? 'equipamentos.id_lab IS NULL' : 'equipamentos.id_lab = ?'}
        `
    let dados = await query(sql, [id_lab])
    return dados
}

async function add(nome, descricao, code, id_lab){
    let sql = 'INSERT INTO equipamentos (id, nome, descricao, code, id_lab) VALUES (0,?,?,?,?)'
    let dados = await query(sql, [nome, descricao, code, id_lab])
    return dados
}

async function update(id, nome, descricao, code, id_lab){
    let sql = 'UPDATE equipamentos SET nome = ?, descricao = ?, code = ?, id_lab = ? WHERE id = ? ';
    let dados = await query(sql, [nome, descricao, code, id_lab, id])
    return dados
}

async function apagar(id){
    console.log({ id })
    let sql = 'DELETE FROM equipamentos WHERE id = ? '
    await query(sql, [id])
    return true
}


module.exports = {
    listar,
    add,
    update,
    apagar
}