export interface CursoItem {
  title: string;
  imgSrc: string;
}

export interface CursosModel {
  tecnologia: CursoItem[];
  negocios: CursoItem[];
  productividad: CursoItem[];
  gestion: CursoItem[];
}
