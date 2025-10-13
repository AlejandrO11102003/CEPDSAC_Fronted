export interface DiplomadoItem {
  title: string;
  imgSrc: string;
}

export interface DiplomadosModel {
  educacion: DiplomadoItem[];
  ingenieria: DiplomadoItem[];
  salud: DiplomadoItem[];
  direccionYgerencia: DiplomadoItem[];
}
