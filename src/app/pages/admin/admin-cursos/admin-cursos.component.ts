import { Component } from '@angular/core';
import { SearchBarAdminComponent } from "../../../components/search-bar-admin/search-bar-admin.component";
import { DataTableAdminComponent } from "../../../components/data-table-admin/data-table-admin.component";

@Component({
  selector: 'app-admin-cursos',
  imports: [SearchBarAdminComponent, DataTableAdminComponent],
  templateUrl: './admin-cursos.component.html',
  styleUrls: ['../../admin/admin-styles.css','./admin-cursos.component.css']
})
export class AdminCursosComponent {
  
  
}
