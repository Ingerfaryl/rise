DROP PROCEDURE IF EXISTS sp_alianza 

CREATE PROCEDURE sp_alianza(
    IN p_opcion CHAR(1),
    IN p_id_alianza_rok INT,
    IN p_nombre_alianza VARCHAR(100),
    IN p_siglas CHAR(4)
)
BEGIN
    DECLARE v_msg VARCHAR(250);

    -- =========================
    -- READ
    -- =========================
    IF p_opcion = 'R' THEN
        SELECT *
        FROM tb_alianzas
        WHERE (p_id_alianza_rok IS NULL OR id_alianza = p_id_alianza_rok)
           OR (p_nombre_alianza IS NULL OR nombre_alianza = p_nombre_alianza)
           OR (p_siglas IS NULL OR siglas = p_siglas);
    
    -- =========================
    -- CREATE
    -- =========================
    ELSEIF p_opcion = 'C' THEN
        IF EXISTS (SELECT 1 FROM tb_alianzas WHERE nombre_alianza = p_nombre_alianza) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ya existe una alianza registrada con el mismo nombre';
        END IF;

        IF EXISTS (SELECT 1 FROM tb_alianzas WHERE siglas = p_siglas) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ya existe una alianza registrada con las mismas siglas';
        END IF;

        INSERT INTO tb_alianzas (nombre_alianza, siglas, fecha_create, flg_Activo)
        VALUES (p_nombre_alianza, p_siglas, NOW(), 1);

    -- =========================
    -- UPDATE
    -- =========================
    ELSEIF p_opcion = 'U' THEN
        IF NOT EXISTS (SELECT 1 FROM tb_alianzas WHERE id_alianza = p_id_alianza_rok) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La alianza no existe';
        END IF;

        IF EXISTS (SELECT 1 FROM tb_alianzas WHERE nombre_alianza = p_nombre_alianza AND id_alianza <> p_id_alianza_rok) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Otra alianza ya está registrada con ese nombre';
        END IF;

        IF EXISTS (SELECT 1 FROM tb_alianzas WHERE siglas = p_siglas AND id_alianza <> p_id_alianza_rok) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Otra alianza ya está registrada con esas siglas';
        END IF;

        UPDATE tb_alianzas
        SET nombre_alianza = COALESCE(p_nombre_alianza, nombre_alianza),
            siglas         = COALESCE(p_siglas, siglas)
        WHERE id_alianza = p_id_alianza_rok;

    -- =========================
    -- DELETE
    -- =========================
    ELSEIF p_opcion = 'D' THEN
        IF NOT EXISTS (SELECT 1 FROM tb_alianzas WHERE id_alianza = p_id_alianza_rok) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La alianza no existe';
        END IF;

        DELETE FROM tb_alianzas WHERE id_alianza = p_id_alianza_rok;
    END IF;
END

