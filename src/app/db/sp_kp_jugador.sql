DROP PROCEDURE IF EXISTS sp_kp_jugador;
CREATE PROCEDURE sp_kp_jugador (
  IN p_opcion CHAR(1),
  IN p_id_jugador BIGINT,
  IN p_id_etapa INT,
  IN p_id_kvk INT,
  IN p_kp_etapa BIGINT,
  IN p_poder_etapa BIGINT
)
BEGIN
  DECLARE v_msg VARCHAR(200);

  IF p_opcion = 'C' THEN
    INSERT INTO tb_kp_jugador (id_jugador_rok, id_etapa, id_kvk, kp_etapa, poder_etapa)
    VALUES (p_id_jugador, p_id_etapa, p_id_kvk, p_kp_etapa, p_poder_etapa);

    UPDATE tb_jugador
    SET kp_inicial = kp_inicial + p_kp_etapa,
        poder = p_poder_etapa
    WHERE id_jugador_rok = p_id_jugador;

  ELSEIF p_opcion = 'R' THEN
    SELECT 
      kj.id_kp_jugador,
      j.nombre_juego,
      kj.id_jugador_rok,
      kj.id_etapa,
      kj.kp_etapa,
      kj.poder_etapa
    FROM tb_kp_jugador kj
    INNER JOIN tb_jugador j ON j.id_jugador_rok = kj.id_jugador_rok;

  ELSEIF p_opcion = 'U' THEN
    UPDATE tb_kp_jugador
    SET kp_etapa    = p_kp_etapa,
        poder_etapa = p_poder_etapa
    WHERE id_jugador = p_id_jugador AND id_etapa = p_id_etapa;

  ELSEIF p_opcion = 'D' THEN
    DELETE FROM tb_kp_jugador
    WHERE id_jugador = p_id_jugador AND id_etapa = p_id_etapa;

  END IF;

END;