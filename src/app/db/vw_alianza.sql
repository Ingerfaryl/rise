alter view vw_listar_alianzas as
select tb_alianzas.id_alianza,
       tb_alianzas.nombre_alianza
from tb_alianzas
WHERE flg_Activo = 1;