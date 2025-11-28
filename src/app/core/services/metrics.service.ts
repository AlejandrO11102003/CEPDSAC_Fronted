import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

export interface MetricsResponse {
  estudiantes: number;
  certificaciones: number;
  instructores: number;
  cursos: number;
}

@Injectable({
  providedIn: 'root',
})
export class MetricsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/metrics`;

  getMetrics(): Observable<MetricsResponse> {
    return this.http.get<MetricsResponse>(this.apiUrl);
  }
}
