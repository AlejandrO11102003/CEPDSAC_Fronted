import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';
import { Descuento, DescuentoCreateDTO, DescuentoUpdateDTO, DescuentoAplicacion, DescuentoAplicacionCreateDTO } from '../models/descuento.model';

@Injectable({
  providedIn: 'root'
})
export class DescuentoService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/descuentos`;
  private apiAplicacionUrl = `${environment.apiUrl}/aplicaciondescuento`;

  // --- Descuentos ---

  listar(): Observable<Descuento[]> {
    return this.http.get<Descuento[]>(`${this.apiUrl}`);
  }

  obtener(id: number): Observable<Descuento> {
    return this.http.get<Descuento>(`${this.apiUrl}/${id}`);
  }

  crear(dto: DescuentoCreateDTO): Observable<Descuento> {
    return this.http.post<Descuento>(`${this.apiUrl}`, dto);
  }

  actualizar(dto: DescuentoUpdateDTO): Observable<Descuento> {
    return this.http.put<Descuento>(`${this.apiUrl}`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  //aplicaciones de descuentos  
  listarAplicaciones(): Observable<DescuentoAplicacion[]> {
    return this.http.get<DescuentoAplicacion[]>(`${this.apiAplicacionUrl}`);
  }

  obtenerAplicacion(id: number): Observable<DescuentoAplicacion> {
    return this.http.get<DescuentoAplicacion>(`${this.apiAplicacionUrl}/${id}`);
  }

  crearAplicacion(dto: DescuentoAplicacionCreateDTO): Observable<DescuentoAplicacion> {
    return this.http.post<DescuentoAplicacion>(`${this.apiAplicacionUrl}`, dto);
  }

  actualizarAplicacion(id: number, dto: DescuentoAplicacionCreateDTO): Observable<DescuentoAplicacion> {
    return this.http.put<DescuentoAplicacion>(`${this.apiAplicacionUrl}/${id}`, dto);
  }

  eliminarAplicacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiAplicacionUrl}/${id}`);
  }
}
