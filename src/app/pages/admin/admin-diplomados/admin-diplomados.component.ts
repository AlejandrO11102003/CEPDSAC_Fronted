import { Component } from '@angular/core';
import { SearchBarAdminComponent } from '../../../components/search-bar-admin/search-bar-admin.component';
import { DataTableAdminComponent } from '../../../components/data-table-admin/data-table-admin.component';
import { CursoDiplomadoService } from '../../../core/services/curso-diplomado.service';
import { CursoDiplomado } from '../../../core/models/curso-diplomado.model';

@Component({
  selector: 'app-admin-diplomados',
  imports: [SearchBarAdminComponent, DataTableAdminComponent],
  templateUrl: './admin-diplomados.component.html',
  styleUrls: [
    '../../admin/admin-styles.css',
    './admin-diplomados.component.css',
  ],
})
export class AdminDiplomadosComponent {
  diplomado: CursoDiplomado[] = [];

  constructor(private diplomadoService: CursoDiplomadoService) {}

  ngOnInit(): void {
    this.cargardiplomado();
  }

  cargardiplomado() {
    this.diplomadoService.listar().subscribe({
      //filtramos solo los diplomados
      next: (data) =>
        (this.diplomado = data.filter((curso) => curso.tipo != 'CURSO')),
      error: (err) => console.error('Error cargando diplomados', err),
    });
  }
}
