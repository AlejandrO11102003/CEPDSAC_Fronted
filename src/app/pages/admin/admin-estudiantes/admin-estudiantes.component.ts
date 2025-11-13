import { Component } from '@angular/core';
import { SearchBarAdminComponent } from "../../../components/search-bar-admin/search-bar-admin.component";
import { DataTableAdminComponent } from "../../../components/data-table-admin/data-table-admin.component";

@Component({
  selector: 'app-admin-estudiantes',
  imports: [SearchBarAdminComponent, DataTableAdminComponent],
  templateUrl: './admin-estudiantes.component.html',
  styleUrls: ['../../admin/admin-styles.css','./admin-estudiantes.component.css']
})
export class AdminEstudiantesComponent {

}
