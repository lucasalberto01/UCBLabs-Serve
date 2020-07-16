const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const moment = require('moment-timezone');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

var LaboratorioModel = require('./model/LaboratorioModel')
var ReservaModel = require('./model/ReservaModel')

var connectedUsers = {}

moment.tz.setDefault('America/Sao_Paulo');
moment.locale('pt-BR');

io.on('connection', socket => {
    const { user } = socket.handshake.query;
    console.log('Id Socket Connect', socket.id)
    connectedUsers[user] = socket.id;
});

app.use(express.static('public'));
app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;
  
    return next();
});

var now = moment()

async function atualizacao(){
    let dadosLab = await LaboratorioModel.ListarLab()
    

    dadosLab.forEach(async element => {
        let reservas = await ReservaModel.lista_status2(element.id_lab);

        reservas.forEach(element => {
            if(element.data_inicio !== null, element.data_termino !== null){
                
                let data_inicio = element.data_inicio.toString().replace("Z"," ").replace("T", " ")
                let data_termino = element.data_termino.toString().replace("Z"," ").replace("T", " ")
                
                if(now.isBetween(data_inicio, data_termino )){
                    
                    saida['1'] = { 'materia' : element.materia, 'id_reserva' : element.id_reserva, 'id_lab' : element.id_lab};

                }
                
                if(moment().add({minute : 30}).isBetween(data_inicio, data_termino)){

                    saida['2'] = { 'materia' : element.materia, 'id_reserva' : element.id_reserva, 'id_lab' : element.id_lab};
                }

                if(moment().add({minute : 60}).isBetween(data_inicio, data_termino)){

                    saida['3'] = { 'materia' : element.materia, 'id_reserva' : element.id_reserva, 'id_lab' : element.id_lab};
                }

                if(moment().add({minute : 120}).isBetween(data_inicio, data_termino)){

                    saida['4'] = { 'materia' : element.materia, 'id_reserva' : element.id_reserva, 'id_lab' : element.id_lab};
                }

                
            }
            
        });
    });

    io.emit('StatusUpdata', { 'a' : dadosLab })
}

//setInterval(atualizacao, 1000)


app.use(cors());
app.use(express.json());
app.use(routes);
console.log('[ INICIALIZADO ]')
server.listen(8080);