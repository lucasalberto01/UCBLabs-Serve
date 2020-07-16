select 
    lab_horario.id_lab,
    reserva.materia, 
    lab_horario.hora_inicio,
    lab_horario.hora_fim,
    concat(reserva.data_reserva,' ',lab_horario.hora_inicio) AS data_inicio,
    concat(reserva.data_reserva,' ',lab_horario.hora_fim) AS data_fim,
    reserva.data_reserva

from lab_horario 
LEFT join lab.reserva on reserva.id_lab_horario = lab_horario.id_lab_horario
WHERE data_reserva = '2019-10-15' OR data_reserva IS NULL