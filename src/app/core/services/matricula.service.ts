import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatriculaCreateDTO, MatriculaResponseDTO } from '../models/matricula.model';
import { environment } from '../../../environment/environment';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class MatriculaService {
  private base = `${environment.apiUrl}/matriculas`;
  constructor(private http: HttpClient, private authService: AuthService) {}

  crear(dto: MatriculaCreateDTO): Observable<MatriculaResponseDTO> {
    console.log('MatriculaService.crear -> POST', this.base, dto);
    try {
      const token = this.authService.getToken();
      if (token) {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        console.log('MatriculaService.crear -> enviando Authorization header');
        return this.http.post<MatriculaResponseDTO>(this.base, dto, { headers });
      }
    } catch (e) {
      console.warn('MatriculaService.crear: error leyendo token desde AuthService', e);
    }
    return this.http.post<MatriculaResponseDTO>(this.base, dto);
  }

  notificarPago(idMatricula: number) {
    const url = `${this.base}/${idMatricula}/notificar-pago`;
    console.log('MatriculaService.notificarPago -> POST', url);
    return this.http.post(url, {});
  }
}
