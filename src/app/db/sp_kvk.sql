
create or alter procedure sp_kvk
@opcion				char(1) = '',
@nombre_kvk			varchar(50) = '',
@numero_kvk			int = '',
@fecha_inicio		date,
@fecha_fin			date
as
begin 
	set nocount on;
    declare @msg nvarchar(300);

	if @opcion = 'R'
    begin
        if @numero_kvk is null
        begin
            set @msg = 'Debe enviar el número de kvk para la búsqueda';
            raiserror(@msg, 16, 1);
            return;
        end

        select * 
        from tb_kvk 
        where numero_kvk = @numero_kvk;
    end

	if @opcion = 'C'
    begin
        if ltrim(rtrim(isnull(@nombre_kvk,''))) = '' or @numero_kvk is null or @fecha_inicio is null or @fecha_fin is null
        begin
            set @msg = 'Faltan datos obligatorios: nombre_kvk, numero_kvk, fecha_inicio y fecha_fin';
            raiserror(@msg, 16, 1);
            return;
        end

        if exists(select 1 from tb_kvk where numero_kvk = @numero_kvk)
        begin
            set @msg = 'Ya existe un KVK con ese número';
            raiserror(@msg, 16, 1);
            return;
        end

        insert into tb_kvk (nombre_kvk, numero_kvk, fecha_inicio, fecha_fin)
        values (@nombre_kvk, @numero_kvk, @fecha_inicio, @fecha_fin);

        set @msg = 'KVK creado correctamente';
        print @msg;
    end

	if @opcion = 'U'
    begin
        if @numero_kvk is null
        begin
            set @msg = 'Debe enviar el número de kvk para actualizar';
            raiserror(@msg, 16, 1);
            return;
        end

        if not exists(select 1 from tb_kvk where numero_kvk = @numero_kvk)
        begin
            set @msg = 'No existe un KVK con ese número';
            raiserror(@msg, 16, 1);
            return;
        end

        update tb_kvk
        set 
            nombre_kvk   = isnull(@nombre_kvk, nombre_kvk),
            fecha_inicio = isnull(@fecha_inicio, fecha_inicio),
            fecha_fin    = isnull(@fecha_fin, fecha_fin)
        where numero_kvk = @numero_kvk;

        set @msg = 'KVK actualizado correctamente';
        print @msg;
    end

	if @opcion = 'D'
    begin
        if @numero_kvk is null
        begin
            set @msg = 'Debe enviar el número de kvk para eliminar';
            raiserror(@msg, 16, 1);
            return;
        end

        if not exists(select 1 from tb_kvk where numero_kvk = @numero_kvk)
        begin
            set @msg = 'No existe un KVK con ese número';
            raiserror(@msg, 16, 1);
            return;
        end

        delete from tb_kvk where numero_kvk = @numero_kvk;

        set @msg = 'KVK eliminado correctamente';
        print @msg;
    end
end



