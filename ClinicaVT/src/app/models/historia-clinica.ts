export interface HistoriaClinica {
  id: string;
  altura: number;
  peso: number;
  temperatura: number;
  presion: string;
  adicionales: { clave: string; valor: string }[];
}