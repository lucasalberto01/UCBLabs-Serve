var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'lab',
  charset : 'utf8mb4',
  dateStrings : true
});

connection.connect(function(){
    console.log('[ BD Conectado ]')
});

function query(sql, parametros) {
    return new Promise(function (resolve, reject) {
        connection.query(sql, parametros, (err, result) => {
            if (err) throw err;
            //console.log(result + sql)
            resolve(result)
        });
    });
}


module.exports = {query};