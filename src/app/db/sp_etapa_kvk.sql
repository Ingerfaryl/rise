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
  DECLARE v_msg VARCHAR(200);

  IF p_opcion = 'C' THEN
    INSERT INTO tb_etapa_kvk (id_kvk, nombre_etapa, detalles, fecha_inicio, fecha_fin, fecha_registro)
    VALUES (p_id_kvk, p_nombre_etapa, p_detalles, p_fecha_inicio, p_fecha_fin, CURRENT_DATE());

  ELSEIF p_opcion = 'R' THEN
    SELECT 
      e.id_etapa,
      e.id_kvk,
      e.nombre_etapa,
      e.detalles,
      e.fecha_inicio,
      e.fecha_fin,
      e.fecha_registro
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

  END IF;

END;
