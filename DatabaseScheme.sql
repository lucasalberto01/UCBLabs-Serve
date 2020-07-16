CREATE TABLE IF NOT EXISTS aviso(
	id_aviso INT(255) NOT NULL AUTO_INCREMENT,
	color VARCHAR(255) NOT NULL,
	tipo VARCHAR(255) NOT NULL,
	icone VARCHAR(255) NOT NULL,
	ativo TINYINT(1) NOT NULL DEFAULT 1,
	PRIMARY KEY(id_aviso) 
);

CREATE TABLE IF NOT EXISTS lab_tipo(
	id_lab_tipo INT(255) NOT NULL AUTO_INCREMENT,
	nome VARCHAR(255)  NOT NULL,
	descricao TEXT NULL,
	PRIMARY KEY(id_lab_tipo)
);

CREATE TABLE IF NOT EXISTS laboratorio(
	id_lab INT(255) NOT NULL AUTO_INCREMENT,
	id_lab_tipo INT(255) NOT NULL,
	local VARCHAR(255)  NOT NULL,
	capacidade INT(255) NOT NULL,
	descricao TEXT NULL,
	PRIMARY KEY (id_lab),
	FOREIGN KEY (id_lab_tipo) REFERENCES lab_tipo(id_lab_tipo) 
);

CREATE TABLE IF NOT EXISTS disciplina(
	id_disciplina INT(255) NOT NULL AUTO_INCREMENT,
	nome_disciplina VARCHAR(255) NOT NULL,
	nome_professor VARCHAR(255) NOT NULL,
	color VARCHAR(255) NULL,
	PRIMARY KEY (id_disciplina)
);

CREATE TABLE IF NOT EXISTS lab_horario(
	id_lab_horario INT(255) NOT NULL AUTO_INCREMENT,
	hora_inicio TIME NOT NULL,
	hora_fim TIME NOT NULL,
	PRIMARY KEY(id_lab_horario)
);

INSERT INTO lab_horario 
	(id_lab_horario, hora_inicio, hora_fim) 
VALUES
	(1, '08:00:00', '08:30:00'),
	(2, '08:30:00', '09:00:00'),
	(3, '09:00:00', '09:30:00'),
	(4, '09:30:00', '10:00:00'),
	(5, '10:00:00', '10:30:00'),
	(6, '10:30:00', '11:00:00'),
	(7, '11:00:00', '11:30:00'),
	(8, '11:30:00', '12:00:00'),
	(9, '12:00:00', '12:30:00'),
	(10, '12:30:00', '13:00:00'),
	(11, '13:00:00', '13:30:00'),
	(12, '13:30:00', '14:00:00'),
	(13, '14:00:00', '14:30:00'),
	(14, '14:30:00', '15:00:00'),
	(15, '15:00:00', '15:30:00'),
	(16, '15:30:00', '16:00:00'),
	(17, '16:00:00', '16:30:00'),
	(18, '16:30:00', '17:00:00'),
	(19, '17:00:00', '17:30:00'),
	(20, '17:30:00', '18:00:00'),
	(21, '18:00:00', '18:30:00'),
	(22, '18:30:00', '19:00:00'),
	(23, '19:00:00', '19:30:00'),
	(24, '19:30:00', '20:00:00'),
	(25, '20:00:00', '20:30:00'),
	(26, '20:30:00', '21:00:00'),
	(27, '21:00:00', '21:30:00'),
	(28, '21:30:00', '22:00:00')
;



CREATE TABLE IF NOT EXISTS reserva(
	id_reserva INT(255) NOT NULL AUTO_INCREMENT,
	id_laboratorio INT(255) NOT NULL,
	id_disciplina INT(255) NOT NULL,
	id_pessoa INT(255) NOT NULL,
	data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
	id_lab_horario INT(255) NOT NULL,
	data_reserva DATE NOT NULL,
	PRIMARY KEY(id_reserva),
	FOREIGN KEY(id_laboratorio) REFERENCES laboratorio(id_lab),
	FOREIGN KEY(id_disciplina) REFERENCES disciplina(id_disciplina),
	FOREIGN KEY(id_lab_horario) REFERENCES lab_horario(id_lab_horario)
);

CREATE TABLE IF NOT EXISTS aviso_reserva(
	id_aviso_reserva INT(255) NOT NULL AUTO_INCREMENT,
	id_aviso INT(255) NOT NULL,
	id_reserva INT(255) NOT NULL,
	id_lab INT(255) NOT NULL,
	id_pessoa INT(255) NOT NULL,
	mensagem TEXT NULL,
	data_final DATETIME NULL,
	data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
	sobre ENUM('reserva', 'laboratorio'),
	FOREIGN KEY(id_aviso) REFERENCES aviso(id_aviso),
	FOREIGN KEY(id_reserva) REFERENCES reserva(id_reserva),
	FOREIGN KEY(id_lab) REFERENCES laboratorio(id_lab),
	PRIMARY KEY(id_aviso_reserva)
);

CREATE TABLE IF NOT EXISTS equipamentos(
	id INT(255) NOT NULL,
	nome VARCHAR(255) NOT NULL,
	descricao TEXT(255) NULL,
	code VARCHAR(255) NULL,
	id_lab INT(255) NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY(id_lab) REFERENCES laboratorio(id_lab)
);

CREATE TABLE IF NOT EXISTS manutencao_status(
	id INT(255) NOT NULL,
	nome VARCHAR(255) NOT NULL,
	descricao TEXT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS manutencao(
	id INT(255) NOT NULL,
	id_equipamento INT(255) NOT NULL,
	id_status INT(255) NOT NULL,
	id_lab INT(255) NOT NULL,
	data_entrada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
	obs TEXT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (id_equipamento) REFERENCES equipamentos(id),
	FOREIGN KEY (id_status) REFERENCES manutencao_status(id),
	FOREIGN KEY (id_lab) REFERENCES laboratorio(id_lab)
);

CREATE TABLE IF NOT EXISTS pedidos(
	id_pedido INT(255) NOT NULL,
	id_remetente INT(255) NOT NULL,
	id_disciplina INT(255) NOT NULL,
	data DATE NOT NULL,
	hora_inicio TIME NOT NULL,
	hora_fim TIME NOT NULL,
	observacao TEXT NULL,
	id_tipo_lab INT(255) NOT NULL,
	status VARCHAR(255) NOT NULL DEFAULT 'em andamento',
	data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
	PRIMARY KEY(id_pedido),
	FOREIGN KEY(id_disciplina) REFERENCES disciplina(id_disciplina),
	FOREIGN KEY(id_tipo_lab) REFERENCES lab_tipo(id_lab_tipo)
);
