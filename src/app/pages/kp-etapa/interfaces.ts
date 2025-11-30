export interface KpEtapaParametros {
  opcion: string;
  idJugador: number;
  idEtapa: number;
  idKvk: number;
  kpEtapa: number;
  poderEtapa: number;
}

export interface KpEtapaRespuesta {
  idKpJugador: number;
  nombreJugador: string;
  idJugadorRok: number;
  idEtapa: number;
  kpEtapa: number;
  poderEtapa: number;
}