export interface JugadorParametros {
  opcion: string;
  idJugador: number;
  idAlianza: number;
  nombreJugador: string;
  poder: number;
  kpInicial: number;
}

export interface JugadorRespuesta {
  nombreJuego: string;
  idJugadorRok: number;
  poder: number;
  nombreAlianza: string;
  kpInicial: number;
  fechaRegistro: string;
  flgActivo: boolean;
}