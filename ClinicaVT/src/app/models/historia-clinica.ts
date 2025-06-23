export interface HistoriaClinica {
  altura: number;
  peso: number;
  temperatura: number;
  presion: string;
  adicionales: { clave: string; valor: string }[];
}