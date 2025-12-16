import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { Sponsor } from '../models/sponsor.model';

@Injectable({
  providedIn: 'root',
})
export class SponsorService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/sponsors`;

  listar(): Observable<Sponsor[]> {
    return this.http.get<Sponsor[]>(`${this.apiUrl}`);
  }

  obtenerPorId(id: number): Observable<Sponsor> {
    return this.http.get<Sponsor>(`${this.apiUrl}/${id}`);
  }

  crear(nombre: string, imagen: File): Observable<Sponsor> {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('imagen', imagen);
    return this.http.post<Sponsor>(`${this.apiUrl}`, formData);
  }

  actualizar(id: number, nombre: string, imagen?: File): Observable<Sponsor> {
    const formData = new FormData();
    formData.append('nombre', nombre);
    if (imagen) {
      formData.append('imagen', imagen);
    }
    return this.http.put<Sponsor>(`${this.apiUrl}/${id}`, formData);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getImageUrl(rutaImagen: string): string {
    return rutaImagen;
  }
}
