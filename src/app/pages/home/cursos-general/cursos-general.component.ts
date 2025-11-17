import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CursosService, Curso } from '../../../core/services/curso.service';

@Component({
  selector: 'app-cursos-general',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './cursos-general.component.html',
  styleUrls: ['./cursos-general.component.css'],
})
export class CursosGeneralComponent implements OnInit {
  private cursosService = inject(CursosService);

  categorias: { id: string; name: string }[] = [];
  cursos: Curso[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.cursosService.obtenerCursos().subscribe({
      next: (data) => {
        this.cursos = data;
        this.extraerCategorias();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener cursos', err);
        this.errorMessage = 'No se pudieron cargar los cursos';
        this.isLoading = false;
      },
    });
  }

  extraerCategorias(): void {
    const map = new Map<string, number>();
    this.cursos.forEach((c) => {
      if (c.categoria) {
        map.set(c.categoria, (map.get(c.categoria) || 0) + 1);
      }
    });

    this.categorias = Array.from(map.keys()).map((name, idx) => ({
      id: (idx + 1).toString(),
      name,
    }));
  }

  getImg(curso: Curso): string {
    return (
      (curso as any).imgSrc ||
      'https://placehold.co/600x400/64748B/FFFFFF?text=Curso'
    );
  }
}
