export interface ParametrosAlianza {
  opcion: string;
  idAlianza?: number;
  nombreAlianza?: string;
  siglas?: string;
}

export interface RespuestaAlianza { 
  idAlianza: number;
  nombreAlianza: string;
  siglas: string;
  fechaCreacion: Date;
  flgActivo: string;
}