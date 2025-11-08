
use db_rok;

insert into tb_jugador (id_alianza,nombre_juego,poder,kp_inicial,id_jugador_rok)
values 
('1',N'乂 Weiss berg','74624021','376250282','88183602'),
('15',N'DS亗 LuxeF 3','47672334','367116499','157253593'),
('15',N'DS亗 Luxe','45798870','747372961','146467785');

insert into tb_alianzas(nombre_alianza,siglas) values ('BLOODY VIKINGS','K325');
insert into tb_alianzas(nombre_alianza,siglas) values ('Degenerados Sexuales','DS-3');


select * from tb_alianzas;

select * from tb_jugador



drop table tb_alianzas
drop table tb_jugador


alter table tb_jugador add id_jugador_rok bigint not null

select 
id_jugador_rok, nombre_juego, poder, kp_inicial, tb_alianzas.nombre_alianza, tb_alianzas.siglas
from tb_jugador 
inner join tb_alianzas on tb_jugador.id_alianza = tb_alianzas.id_alianza
where id_jugador_rok = '88183602' ;


select * from vw_listar_alianzas

update tb_alianzas
set flg_Activo = 0
where id_alianza in (5,9);

CALL sp_alianza('R', NULL, NULL, NULL);
