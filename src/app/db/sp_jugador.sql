DROP PROCEDURE IF EXISTS sp_jugador;
CREATE PROCEDURE sp_jugador(
    IN p_opcion CHAR(1),
    IN p_id_jugador_rok BIGINT,
    IN p_id_alianza INT,
    IN p_nombre_juego VARCHAR(200),
    IN p_poder BIGINT,
    IN p_kp_inicial BIGINT
)
BEGIN
    DECLARE v_msg VARCHAR(200);

    -- =========================
    -- READ
    -- =========================
    IF p_opcion = 'R' THEN
        SELECT 
            j.nombre_juego,
            j.id_jugador_rok,
            j.poder,
            a.nombre_alianza,
            j.kp_inicial,
            j.fecha_registro,
            j.flg_Activo
        FROM tb_jugador j
        INNER JOIN tb_alianzas a ON a.id_alianza = j.id_alianza;

    -- =========================
    -- CREATE
    -- =========================
    ELSEIF p_opcion = 'C' THEN
        IF EXISTS (SELECT 1 FROM tb_jugador WHERE id_jugador_rok = p_id_jugador_rok) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ya existe un jugador con ese id_jugador_rok';
        END IF;

        INSERT INTO tb_jugador (id_jugador_rok, id_alianza, nombre_juego, poder, kp_inicial)
        VALUES (p_id_jugador_rok, p_id_alianza, p_nombre_juego, p_poder, p_kp_inicial);

    -- =========================
    -- UPDATE
    -- =========================
    ELSEIF p_opcion = 'U' THEN
        IF NOT EXISTS (SELECT 1 FROM tb_jugador WHERE id_jugador_rok = p_id_jugador_rok) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No existe un jugador con ese id_jugador_rok';
        END IF;

        UPDATE tb_jugador
        SET id_alianza   = p_id_alianza,
            nombre_juego = p_nombre_juego,
            poder        = p_poder,
            kp_inicial   = p_kp_inicial
        WHERE id_jugador_rok = p_id_jugador_rok;

    -- =========================
    -- DELETE
    -- =========================
    ELSEIF p_opcion = 'D' THEN
        IF NOT EXISTS (SELECT 1 FROM tb_jugador WHERE id_jugador_rok = p_id_jugador_rok) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No existe un jugador con ese id_jugador_rok';
        END IF;

        DELETE FROM tb_jugador 
        WHERE id_jugador_rok = p_id_jugador_rok;
    END IF;

    ELSEIF p_opcion = 'L' THEN
        SELECT 
            id_jugador_rok,
            id_kvk,
        FROM tb_jugador_kvk
        WHERE flg_Activo = 1;
    END IF;
END;
