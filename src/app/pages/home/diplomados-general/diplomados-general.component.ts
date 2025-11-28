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
  selector: 'app-diplomados-general',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './diplomados-general.component.html',
  styleUrls: ['./diplomados-general.component.css'],
})
export class DiplomadosGeneralComponent implements OnInit {
  private cursoService = inject(CursoDiplomadoService);

  // Datos
  diplomados: CursoDiplomado[] = [];
  diplomadosFiltrados: CursoDiplomado[] = [];
  categorias: CategoriaView[] = [];

  isLoading = true;
  filtroTexto = '';

  order: string = 'recientes';

  ngOnInit(): void {
    this.cargarDiplomados();
  }

  cargarDiplomados() {
    this.isLoading = true;
    this.cursoService.listarDiplomados().subscribe({
      next: (data) => {
        this.diplomados = data;
        this.extraerCategorias(data);
        this.aplicarFiltros();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error cargando diplomados:', error);
        this.isLoading = false;
      },
    });
  }

  private extraerCategorias(items: CursoDiplomado[]) {
    const map = new Map<number, string>();
    items.forEach(
      (i) => i.categoria && map.set(i.categoria.idCategoria, i.categoria.nombre)
    );
    this.categorias = Array.from(map.entries()).map(([id, nombre]) => ({
      id,
      nombre,
      seleccionada: false,
    }));
  }

  getImg(item: CursoDiplomado): string {
    return item.urlCurso && item.urlCurso.startsWith('http')
      ? item.urlCurso
      : 'diplomado-default.webp';
  }

  aplicarFiltros() {
    let resultado = [...this.diplomados];

    // Filtro Texto
    if (this.filtroTexto.trim()) {
      const txt = this.filtroTexto.toLowerCase();
      resultado = resultado.filter((d) => d.titulo.toLowerCase().includes(txt));
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
        (d) => d.categoria && cats.includes(d.categoria.idCategoria)
      );
    }

    this.diplomadosFiltrados = resultado;
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
