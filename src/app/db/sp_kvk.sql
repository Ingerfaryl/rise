DROP PROCEDURE IF EXISTS sp_kvk;
CREATE PROCEDURE sp_kvk(
    IN p_opcion CHAR(1),
    IN p_nombre_kvk VARCHAR(50),
    IN p_numero_kvk INT,
    IN p_fecha_inicio DATE,
    IN p_fecha_fin DATE
)
BEGIN
    DECLARE v_msg VARCHAR(300);

    -- =========================
    -- READ
    -- =========================
    IF p_opcion = 'R' THEN
        IF p_numero_kvk IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Debe enviar el número de KVK para la búsqueda';
        END IF;

        SELECT * 
        FROM tb_kvk 
        WHERE numero_kvk = p_numero_kvk;

    -- =========================
    -- CREATE
    -- =========================
    ELSEIF p_opcion = 'C' THEN
        IF (TRIM(COALESCE(p_nombre_kvk, '')) = '' 
            OR p_numero_kvk IS NULL 
            OR p_fecha_inicio IS NULL 
            OR p_fecha_fin IS NULL) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Faltan datos obligatorios: nombre_kvk, numero_kvk, fecha_inicio y fecha_fin';
        END IF;

        IF EXISTS (SELECT 1 FROM tb_kvk WHERE numero_kvk = p_numero_kvk) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ya existe un KVK con ese número';
        END IF;

        INSERT INTO tb_kvk (nombre_kvk, numero_kvk, fecha_inicio, fecha_fin)
        VALUES (p_nombre_kvk, p_numero_kvk, p_fecha_inicio, p_fecha_fin);

        SELECT 'KVK creado correctamente' AS mensaje;

    -- =========================
    -- UPDATE
    -- =========================
    ELSEIF p_opcion = 'U' THEN
        IF p_numero_kvk IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Debe enviar el número de KVK para actualizar';
        END IF;

        IF NOT EXISTS (SELECT 1 FROM tb_kvk WHERE numero_kvk = p_numero_kvk) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No existe un KVK con ese número';
        END IF;

        UPDATE tb_kvk
        SET nombre_kvk   = COALESCE(p_nombre_kvk, nombre_kvk),
            fecha_inicio = COALESCE(p_fecha_inicio, fecha_inicio),
            fecha_fin    = COALESCE(p_fecha_fin, fecha_fin)
        WHERE numero_kvk = p_numero_kvk;

        SELECT 'KVK actualizado correctamente' AS mensaje;

    -- =========================
    -- DELETE
    -- =========================
    ELSEIF p_opcion = 'D' THEN
        IF p_numero_kvk IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Debe enviar el número de KVK para eliminar';
        END IF;

        IF NOT EXISTS (SELECT 1 FROM tb_kvk WHERE numero_kvk = p_numero_kvk) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No existe un KVK con ese número';
        END IF;

        DELETE FROM tb_kvk WHERE numero_kvk = p_numero_kvk;

        SELECT 'KVK eliminado correctamente' AS mensaje;
    END IF;
END;
