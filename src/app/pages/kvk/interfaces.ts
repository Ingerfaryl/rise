export interface ParametrosKvk {
  opcion: string;
  nombreKvk: string;
  numeroKvk: string;
  fechaInicio: Date;
  fechaFin: Date;
}

export interface RespuestaKvk{
  idKvk: number;
  nombreKvk: string;
  numeroKvk: string;
  fechaInicio: Date;
  fechaFin: Date;
}

export interface ParametrosEtapaKvk {
  opcion: string;
  idKvk: number;
  nombreEtapa: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
}
export interface RespuestaEtapaKvk{
  idEtapaKvk: number;
  idKvk: number;
  nombreEtapa: string;
  detalles: string;
  fechaInicioEtapa: Date;
  fechaFinEtapa: Date;
  fechaRegistro: Date;
}