import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CursoDiplomadoService } from '../../../core/services/curso-diplomado.service';
import { CursoDetalle } from '../../../core/models/curso-diplomado.model';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { ToastService } from '../../../core/services/toast.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-diplomado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diplomado.component.html',
  styleUrls: ['./diplomado.component.css'],
})
export class DiplomadoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private cursoDiplomadoService = inject(CursoDiplomadoService);
  private errorHandler = inject(ErrorHandlerService);
  private toast = inject(ToastService);
  private router = inject(Router);

  diplomado = signal<CursoDetalle | null>(null);
  isLoading = signal(true);
  cursoId: number | null = null;
  programacionSeleccionada: number | null = null;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cursoId = +id;
      this.cargarDiplomado(+id);
    } else {
      this.toast.error('ID de diplomado no válido');
      this.isLoading.set(false);
      this.router.navigate(['/diplomados']);
    }
  }

  cargarDiplomado(id: number): void {
    this.isLoading.set(true);
    this.cursoDiplomadoService.obtenerDetalle(id).subscribe({
      next: (data) => {
        this.diplomado.set(data);
        if (data.programaciones && data.programaciones.length > 0) {
          this.programacionSeleccionada =
            data.programaciones[0].idProgramacionCurso;
        }
        this.isLoading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        console.error('error cargando diplomado:', err);
        const mensaje = this.errorHandler.getErrorMessage(err);
        this.toast.error(mensaje);
        this.isLoading.set(false);
      },
    });
  }

  seleccionarProgramacion(idProgramacion: number): void {
    this.programacionSeleccionada = idProgramacion;
  }

  matricularPrimer(): void {
    const d = this.diplomado();
    if (!d || !this.cursoId) {
      this.toast.error('Datos no cargados correctamente.');
      return;
    }

    if (!this.programacionSeleccionada) {
      this.toast.error(
        'Por favor selecciona una programación antes de matricularte.'
      );
      return;
    }

    this.router.navigate([
      '/matricula',
      this.cursoId,
      this.programacionSeleccionada,
    ]);
  }

  getModalidadLabel(modalidad: string): string {
    const labels: Record<string, string> = {
      PRESENCIAL: 'Presencial',
      VIRTUAL: 'Virtual',
      VIRTUAL_24_7: 'Virtual 24/7',
    };
    return labels[modalidad] || modalidad;
  }

  getNombreCompleto(prog: any): string {
    if (prog.nombreDocente && prog.apellidoDocente) {
      return `${prog.nombreDocente} ${prog.apellidoDocente}`;
    } else if (prog.nombreDocente) {
      return prog.nombreDocente;
    }
    return 'Por asignar';
  }

  getMaterialesArray(): string[] {
    const d = this.diplomado();
    return d?.materialesIncluidos
      ? d.materialesIncluidos.split('|').filter((m) => m.trim())
      : [];
  }

  getRequisitosArray(): string[] {
    const d = this.diplomado();
    return d?.requisitos ? d.requisitos.split('|').filter((r) => r.trim()) : [];
  }

  comprar() {
    const d = this.diplomado();
    // Selecciona la primera programación disponible por defecto
    const first =
      d?.programaciones && d.programaciones.length > 0
        ? d.programaciones[0].idProgramacionCurso
        : null;

    const diplomadoId = d?.idCursoDiplomado ?? null;

    if (!first || !diplomadoId) {
      this.toast.error('No hay programaciones disponibles para comprar.');
      return;
    }

    this.irAMatricula(diplomadoId, first);
  }

  irAMatricula(diplomadoId: number | null, programacionId: number) {
    if (!programacionId || !diplomadoId) {
      this.toast.error('ID de diplomado o programación inválido');
      return;
    }

    this.router.navigate(['/matricula', diplomadoId, programacionId]);
  }
}
