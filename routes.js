const express = require('express');
const routes = express.Router();

const MainController = require('./controllers/MainController')
const LaboratorioController = require('./controllers/LaboratorioController')
const LaboratorioTiposController = require('./controllers/LaboratorioTiposController')
const ReservaController = require('./controllers/ReservaController')
const AvisosController = require('./controllers/AvisosController')
const HorariosController = require('./controllers/HorariosController')
const DiciplinaController = require('./controllers/DiciplinaController')
const PedidoController = require('./controllers/PedidoController')
const TiposAvisosController = require('./controllers/TiposAvisosController')
const equipamentosController = require('./controllers/EquipamentoController')
const ManutencaoController = require('./controllers/ManutencaoController')
const RelatorioController = require('./controllers/RelatorioController')


routes.post('/laboratorio/lista', LaboratorioController.lista)
routes.post('/laboratotio/novo', LaboratorioController.adicionar)
routes.post('/laboratotio/mostra/:id', LaboratorioController.mostrar)
routes.post('/laboratotio/apagar/:id', LaboratorioController.apagar)
routes.post('/laboratotio/editar/:id', LaboratorioController.editar)

routes.post('/tipos-laboratorios/listar', LaboratorioTiposController.listar)
routes.post('/tipos-laboratorios/add', LaboratorioTiposController.adicionar)
routes.post('/tipos-laboratorios/edit', LaboratorioTiposController.editar)
routes.post('/tipos-laboratorios/apagar', LaboratorioTiposController.apagar)


routes.post('/reserva/add', ReservaController.inserir)
routes.post('/reserva/lista', ReservaController.lista)
routes.post('/reserva/lista/date', ReservaController.listar_data)
routes.post('/reserva/lab/:id', ReservaController.lab)
routes.post('/reserva/status', ReservaController.listar_status)
routes.post('/reserva/exibir/:id', ReservaController.exibir)
routes.post('/reserva/verifica', ReservaController.verifica)
routes.post('/reserva/editar', ReservaController.editar)

routes.post('/avisos/listartipos', AvisosController.listarTiposAlertas)
routes.post('/avisos/add', AvisosController.add)
routes.post('/avisos/lista', AvisosController.lista)
routes.post('/avisos/editar', AvisosController.editar)
routes.post('/avisos/apagar/:id', AvisosController.apagar)

routes.post('/avisos/tipos/lista', TiposAvisosController.listar)
routes.post('/avisos/tipos/add', TiposAvisosController.add)
routes.post('/avisos/tipos/editar', TiposAvisosController.update)
routes.post('/avisos/tipos/apagar', TiposAvisosController.deleted)
routes.post('/avisos/tipos/ativar', TiposAvisosController.enable)

routes.post('/horarios/inserir', HorariosController.inserir)
routes.post('/horarios/listar', HorariosController.listar)
routes.post('/horarios/listar-horarios', HorariosController.litar_horarios)

routes.post('/diciplina/listar', DiciplinaController.listar)
routes.post('/diciplina/editar', DiciplinaController.editar)
routes.post('/diciplina/add', DiciplinaController.add)

routes.post('/pedido/novo', PedidoController.novo)
routes.post('/pedido/listar_id/:id', PedidoController.listar)
routes.post('/pedido/listar/data/:id', PedidoController.listar_data)
routes.post('/pedidos/litar-todos', PedidoController.listar_todos)
routes.post('/pedidos/exibir/:id', PedidoController.exibir)
routes.post('/pedidos/cancelar/:id', PedidoController.cancelar)

routes.post('/equipamentos/listar', equipamentosController.listar )
routes.post('/equipamentos/add', equipamentosController.add )
routes.post('/equipamentos/edit/:id', equipamentosController.edit )
routes.post('/equipamentos/apagar/:id', equipamentosController.apagar )

routes.post('/manutencao/salvar', ManutencaoController.save)
routes.post('/manutencao/editar', ManutencaoController.edit)
routes.post('/manutencao/listar', ManutencaoController.listar)
routes.post('/manutencao/status/listar', ManutencaoController.lista_status)

routes.post('/relatorio/resume', RelatorioController.resume)
routes.post('/relatorio/grafico/manutencao', RelatorioController.grafico_manutancao)
routes.post('/relatorio/grafico/avisos', RelatorioController.grafico_avisos)
routes.post('/relatorio/grafico/pedidos', RelatorioController.grafico_pedidos)


routes.post('/teste', ReservaController.teste)
routes.get('/*', MainController.index)

module.exports = routes;