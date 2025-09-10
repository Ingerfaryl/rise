
use db_rok;

insert into tb_jugador (id_alianza,nombre_juego,poder,kp_inicial,id_jugador_rok)
values ('1',N'乂 Weiss berg','74624021','376250282','88183602')

insert into tb_alianzas(nombre_alianza,siglas) values ('BLOODY VIKINGS','K325')

select * from tb_alianzas
select * from tb_jugador



drop table tb_alianzas
drop table tb_jugador


alter table tb_jugador add id_jugador_rok bigint not null
