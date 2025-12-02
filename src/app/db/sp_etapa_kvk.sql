DROP PROCEDURE IF EXISTS sp_etapa_kvk;

CREATE PROCEDURE sp_etapa_kvk (
  IN p_opcion CHAR(1),
  IN p_id_kvk INT,
  IN p_nombre_etapa VARCHAR(100),
  IN p_detalles TEXT,
  IN p_fecha_inicio DATE,
  IN p_fecha_fin DATE
)
BEGIN
  IF p_opcion = 'C' THEN
    INSERT INTO
        tb_etapa_kvk (
            id_kvk,
            nombre_etapa,
            detalles,
            fecha_inicio,
            fecha_fin,
            fecha_registro
        )
    VALUES (
            p_id_kvk,
            p_nombre_etapa,
            p_detalles,
            p_fecha_inicio,
            p_fecha_fin,
            CURRENT_DATE()
        );
    INSERT INTO
        tb_kp_jugador (
            id_jugador_rok,
            id_etapa,
            id_kvk,
            kp_etapa,
            poder_etapa
        )
    SELECT jk.id_jugador_rok, LAST_INSERT_ID(),
        p_id_kvk, 0, 0
    FROM tb_jugador_kvk jk
    WHERE
        jk.id_kvk = p_id_kvk
        AND NOT EXISTS (
            SELECT 1
            FROM tb_kp_jugador kj
            WHERE
                kj.id_jugador_rok = jk.id_jugador_rok
                AND kj.id_etapa = LAST_INSERT_ID()
                AND kj.id_kvk = p_id_kvk
        );

  ELSEIF p_opcion = 'R' THEN
    SELECT 
      e.id_etapa AS idEtapa,
      e.id_kvk AS idKvk,
      e.nombre_etapa AS nombreEtapa,
      e.detalles AS detalles,
      e.fecha_inicio AS fechaInicio,
      e.fecha_fin AS fechaFin,
      e.fecha_registro AS fechaRegistro
    FROM tb_etapa_kvk e;

  ELSEIF p_opcion = 'D' THEN
    DELETE FROM tb_etapa_kvk
    WHERE id_kvk = p_id_kvk;

  ELSEIF p_opcion = 'U' THEN
    UPDATE tb_etapa_kvk
    SET nombre_etapa = p_nombre_etapa,
        detalles      = p_detalles,
        fecha_inicio  = p_fecha_inicio,
        fecha_fin     = p_fecha_fin
    WHERE id_kvk = p_id_kvk;
    
  ELSEIF p_opcion = 'S' THEN
    SELECT 
      e.id_etapa AS idEtapa,
      e.id_kvk AS idKvk,
      e.nombre_etapa AS nombreEtapa,
      e.detalles AS detalles,
      e.fecha_inicio AS fechaInicio,
      e.fecha_fin AS fechaFin,
      e.fecha_registro AS fechaRegistro
    FROM tb_etapa_kvk e
    WHERE e.id_kvk = p_id_kvk;
  END IF;

END;
