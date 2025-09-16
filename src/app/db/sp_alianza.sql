CREATE OR ALTER PROCEDURE sp_alianza 
	@opcion				CHAR(1) = '',
	@id_alianza_rok		VARCHAR(20) = NULL,
	@nombre_alianza		NVARCHAR(100) = NULL,
	@siglas				NCHAR(4) = NULL
AS 
BEGIN
	SET NOCOUNT ON;

	DECLARE @msg VARCHAR(250);

	-- =========================
	-- READ
	-- =========================
	IF @opcion = 'R'
	BEGIN
		SELECT *
		FROM tb_alianzas
		WHERE (@id_alianza_rok IS NULL OR id_alianza = @id_alianza_rok)
		  or (@nombre_alianza IS NULL OR nombre_alianza = @nombre_alianza)
		  or (@siglas IS NULL OR siglas = @siglas);
		RETURN;
	END

	-- =========================
	-- CREATE
	-- =========================
	IF @opcion = 'C'
	BEGIN
		-- Validaciones
		IF EXISTS (SELECT 1 FROM tb_alianzas WHERE nombre_alianza = @nombre_alianza)
		BEGIN 
			SET @msg = 'Ya existe una alianza registrada con el mismo nombre';
			THROW 51000, @msg, 1;
		END

		IF EXISTS (SELECT 1 FROM tb_alianzas WHERE siglas = @siglas)
		BEGIN 
			SET @msg = 'Ya existe una alianza registrada con las mismas siglas';
			THROW 51000, @msg, 1;
		END

		INSERT INTO tb_alianzas (nombre_alianza, siglas, fecha_create, flg_Activo)
		VALUES (@nombre_alianza, @siglas, GETDATE(), 1);

		RETURN;
	END

	-- =========================
	-- UPDATE
	-- =========================
	IF @opcion = 'U'
	BEGIN
		IF NOT EXISTS (SELECT 1 FROM tb_alianzas WHERE id_alianza = @id_alianza_rok)
		BEGIN 
			SET @msg = 'La alianza no existe';
			THROW 51000, @msg, 1;
		END

		-- Validar duplicados
		IF EXISTS (SELECT 1 FROM tb_alianzas WHERE nombre_alianza = @nombre_alianza AND id_alianza <> @id_alianza_rok)
		BEGIN 
			SET @msg = 'Otra alianza ya está registrada con ese nombre';
			THROW 51000, @msg, 1;
		END

		IF EXISTS (SELECT 1 FROM tb_alianzas WHERE siglas = @siglas AND id_alianza <> @id_alianza_rok)
		BEGIN 
			SET @msg = 'Otra alianza ya está registrada con esas siglas';
			THROW 51000, @msg, 1;
		END

		UPDATE tb_alianzas
		SET nombre_alianza  = ISNULL(@nombre_alianza, nombre_alianza),
			siglas          = ISNULL(@siglas, siglas)
		WHERE id_alianza = @id_alianza_rok;

		RETURN;
	END

	-- =========================
	-- DELETE
	-- =========================
	IF @opcion = 'D'
	BEGIN
		IF NOT EXISTS (SELECT 1 FROM tb_alianzas WHERE id_alianza = @id_alianza_rok)
		BEGIN 
			SET @msg = 'La alianza no existe';
			THROW 51000, @msg, 1;
		END

		DELETE FROM tb_alianzas 
		WHERE id_alianza = @id_alianza_rok;

		RETURN;
	END
END
