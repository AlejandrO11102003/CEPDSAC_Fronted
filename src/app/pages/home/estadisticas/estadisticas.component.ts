import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MetricsService, MetricsResponse } from '../../../core/services/metrics.service';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
})
export class EstadisticasComponent implements OnInit {
  metrics: MetricsResponse = { estudiantes: 0, certificaciones: 0, instructores: 0, cursos: 0 };

  constructor(private metricsService: MetricsService) {}

  ngOnInit(): void {
    this.metricsService.getMetrics().subscribe({
      next: (m) => (this.metrics = m),
      error: (err) => console.error('Error cargando métricas', err),
    });
  }
}
