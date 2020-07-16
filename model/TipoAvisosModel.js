const { query } = require('./ConnModel')

async function listar(){
    let sql = 'SELECT * FROM `aviso`'
    let dados = await query(sql, [])
    return dados
}

async function criar(color, tipo, icone){
    let sql = 'INSERT INTO aviso (id_aviso, color, tipo, icone) VALUES (0, ?, ?, ?)';
    let dados = await query(sql, [color, tipo, icone])
    return true
}

async function update(id, cor, icone, tipo){
    let sql = 'UPDATE aviso SET color = ?, tipo = ?, icone = ? WHERE id_aviso = ?';
    await query(sql, [cor, tipo, icone, id])
    return true
}

async function deleted(id){
    let sql = 'UPDATE aviso SET ativo = 0 WHERE id_aviso = ?';
    await query(sql, [id])
    return true;
}

async function enable(id){
    let sql = 'UPDATE aviso SET ativo = 1 WHERE id_aviso = ?';
    await query(sql, [id])
    return true;
}

module.exports = {
    listar,
    criar,
    update,
    deleted,
    enable
}