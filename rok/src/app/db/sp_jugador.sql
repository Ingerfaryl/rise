
create or alter procedure sp_jugador
@opcion				char(1) = '',
@id_jugador_rok		bigint = '',
@id_alianza			int = '',
@nombre_juego		nvarchar(200) = '',
@poder				bigint = '',
@kp_inicial			bigint = ''
as
begin
	set nocount on;
	declare @msg varchar (200)

	if @opcion = 'R'
	begin 
		select 
			j.nombre_juego,
			j.id_jugador_rok,
			j.poder,
			a.nombre_alianza,
			j.kp_inicial
		from tb_jugador j
		inner join tb_alianzas a on a.id_alianza = j.id_alianza
		where j.id_jugador_rok = @id_jugador_rok or j.nombre_juego = @nombre_juego
	end

	if @opcion = 'C'
	begin
		 if exists(select 1 from tb_jugador where id_jugador_rok = @id_jugador_rok)
		begin
			set @msg = 'Ya existe un jugador con ese id_jugador_rok';
			raiserror(@msg, 16, 1);
			return;
		end

		insert into tb_jugador (id_jugador_rok,id_alianza,nombre_juego,poder,kp_inicial)values 
		(@id_jugador_rok,@id_alianza,@nombre_juego,@poder,@kp_inicial)
	end
	if @opcion = 'U'
	begin
		if not exists(select 1 from tb_jugador where id_jugador_rok = @id_jugador_rok)
		begin
			set @msg = 'No existe un jugador con ese id_jugador_rok';
			raiserror(@msg, 16, 1);
			return;
		end

		update tb_jugador
		set id_alianza = @id_alianza,
			nombre_juego = @nombre_juego,
			poder = @poder,
			kp_inicial = @kp_inicial
		where id_jugador_rok = @id_jugador_rok
	end
	if @opcion = 'D'
	begin 
		if not exists(select 1 from tb_jugador where id_jugador_rok = @id_jugador_rok)
		begin
			set @msg = 'No existe un jugador con ese id_jugador_rok';
			raiserror(@msg, 16, 1);
			return;
		end
		delete from tb_jugador where id_jugador = @id_jugador_rok
	end
end