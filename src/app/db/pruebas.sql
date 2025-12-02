
use db_rok;

DROP TABLE tb_kp_jugador;

insert into tb_jugador (id_alianza,nombre_juego,poder,kp_inicial,id_jugador_rok)
values 
('1',N'乂 Weiss berg','74624021','376250282','88183602'),
('15',N'DS亗 LuxeF 3','47672334','367116499','157253593'),
('15',N'DS亗 Luxe','45798870','747372961','146467785');

insert into tb_alianzas(nombre_alianza,siglas) values ('BLOODY VIKINGS','K325');
insert into tb_alianzas(nombre_alianza,siglas) values ('Degenerados Sexuales','DS-3');

ALTER TABLE tb_alianzas
ADD CONSTRAINT uq_nombre_alianza UNIQUE (nombre_alianza);

select * from tb_alianzas;


select * from tb_jugador;

select * from tb_kvk;

insert into tb_kvk (nombre_kvk, numero_kvk, fecha_inicio, fecha_fin)
values ('Himno Heroico', 1, '2025-04-01', '2025-06-30');


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

CALL sp_jugador('R', 0, 0, '', 0, 0);

call sp_kvk('R', '', null, null, null);

call sp_kvk('C', 'Prueba KVK', 1, '2025-07-01', '2025-09-30');

CALL sp_etapa_kvk('C', 1, 'Etapa 4', 'ñiñiñi', '2025-06-01', '2025-06-30');

CALL sp_etapa_kvk('R', NULL, NULL, NULL, NULL, NULL);

CALL sp_kp_jugador('C', 157253593, 1,1, 1326400, 3000);

CALL sp_kp_jugador('R', NULL, 1,1, NULL,NULL);

CALL sp_jugador_kvk('C', 88183602, 1);
CALL sp_jugador_kvk('R', NULL, 1);

select * from tb_jugador_kvk;
SELECT id_etapa, id_kvk, nombre_etapa
FROM tb_etapa_kvk
WHERE
    id_kvk =1;
