import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

export interface Curso {
  id: number;
  nombre: string;
  categoria: string;
  modalidad: number; // duracion en horas
}

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  private apiUrl = `${environment.apiUrl}/cursos-diplomados/listar`;
  constructor(private http: HttpClient) {}

  obtenerCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.apiUrl);
  }

  obtenerCursoPorId(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${this.apiUrl}/${id}`);
  }
}
