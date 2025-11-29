import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CursoDiplomadoService } from '../../../core/services/curso-diplomado.service';
import { CursoDiplomado } from '../../../core/models/curso-diplomado.model';

interface CategoriaView {
  id: number;
  nombre: string;
  seleccionada: boolean;
}

@Component({
  selector: 'app-cursos-general',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cursos-general.component.html',
  styleUrls: ['./cursos-general.component.css'],
})
export class CursosGeneralComponent implements OnInit {
  private cursoService = inject(CursoDiplomadoService);

  // Datos
  cursos: CursoDiplomado[] = [];
  cursosFiltrados: CursoDiplomado[] = [];
  categorias: CategoriaView[] = [];

  isLoading = true;
  filtroTexto = '';

  order: string = 'recientes';

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos() {
    this.isLoading = true;
    this.cursoService.listarCursos().subscribe({
      next: (data) => {
        this.cursos = data;
        this.extraerCategorias(data);
        this.aplicarFiltros();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar cursos:', error);
        this.isLoading = false;
      },
    });
  }

  private extraerCategorias(cursos: CursoDiplomado[]) {
    const mapCategorias = new Map<number, string>();
    cursos.forEach((curso) => {
      if (curso.categoria) {
        mapCategorias.set(curso.categoria.idCategoria, curso.categoria.nombre);
      }
    });
    this.categorias = Array.from(mapCategorias.entries()).map(
      ([id, nombre]) => ({
        id,
        nombre,
        seleccionada: false,
      })
    );
  }

  getImg(curso: CursoDiplomado): string {
    return curso.urlCurso && curso.urlCurso.startsWith('http')
      ? curso.urlCurso
      : 'curso-default.webp';
  }

  aplicarFiltros() {
    let resultado = [...this.cursos];

    // Filtro Texto
    if (this.filtroTexto.trim()) {
      const texto = this.filtroTexto.toLowerCase();
      resultado = resultado.filter((c) =>
        c.titulo.toLowerCase().includes(texto)
      );
    }

    // Ordenar
    switch (this.order) {
      case 'recientes':
        resultado.sort((a, b) => b.idCursoDiplomado - a.idCursoDiplomado);
        break;
      case 'antiguos':
        resultado.sort((a, b) => a.idCursoDiplomado - b.idCursoDiplomado);
        break;
      case 'az':
        resultado.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
      case 'za':
        resultado.sort((a, b) => b.titulo.localeCompare(a.titulo));
        break;
    }

    // Filtro Categorías
    const cats = this.categorias.filter((c) => c.seleccionada).map((c) => c.id);
    if (cats.length > 0) {
      resultado = resultado.filter(
        (c) => c.categoria && cats.includes(c.categoria.idCategoria)
      );
    }

    this.cursosFiltrados = resultado;
  }

  toggleCategoria(cat: CategoriaView) {
    cat.seleccionada = !cat.seleccionada;
    this.aplicarFiltros();
  }

  limpiarFiltros() {
    this.filtroTexto = '';
    this.categorias.forEach((c) => (c.seleccionada = false));
    this.aplicarFiltros();
  }
}
