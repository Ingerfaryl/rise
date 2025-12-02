DROP PROCEDURE IF EXISTS sp_jugador_kvk;

CREATE PROCEDURE sp_jugador_kvk(
    IN p_opcion CHAR(1),
    IN p_id_jugador_rok BIGINT,
    IN p_id_kvk INT
)
BEGIN
    IF p_opcion = 'C' THEN
        INSERT INTO
            tb_jugador_kvk (id_jugador_rok, id_kvk)
        VALUES (p_id_jugador_rok, p_id_kvk);
        
        INSERT INTO
            tb_kp_jugador (
                id_jugador_rok,
                id_etapa,
                id_kvk,
                kp_etapa,
                poder_etapa
            )
        SELECT
            p_id_jugador_rok,
            ek.id_etapa,
            p_id_kvk,
            0,
            0
        FROM tb_etapa_kvk ek
        WHERE
            ek.id_kvk = p_id_kvk
            AND NOT EXISTS (
                SELECT 1
                FROM tb_kp_jugador kj
                WHERE
                    kj.id_jugador_rok = p_id_jugador_rok
                    AND kj.id_etapa = ek.id_etapa
                    AND kj.id_kvk = p_id_kvk
            );

    ELSEIF p_opcion = 'D' THEN
        DELETE FROM tb_jugador_kvk
        WHERE 
          id_jugador_rok = p_id_jugador_rok
          AND id_kvk = p_id_kvk;
          
    ELSEIF p_opcion = 'R' THEN
        SELECT
            id_jugador_rok,
            id_kvk,
            flg_participa,
            fecha_registro
        FROM tb_jugador_kvk
        WHERE
            id_kvk = p_id_kvk;
    END IF;
END;